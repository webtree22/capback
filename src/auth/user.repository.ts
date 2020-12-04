import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserFilterDto } from './dto/user-filter.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, school_id } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.school_id = school_id;
    user.user_role = 'student';

    try {
      await user.save();
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username/Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async getUsers(filterDto: UserFilterDto, user: User): Promise<User[]> {
    if (user.user_role !== 'admin') {
      throw new UnauthorizedException();
    }

    const { user_role, search, with_profile } = filterDto;
    const query = this.createQueryBuilder('user');

    query.where('user.school_id = :school_id', {
      school_id: user.school_id,
    });

    if (user_role) {
      query.andWhere('user.user_role = :user_role', { user_role });
    }

    if (search) {
      query.andWhere('(user.username LIKE :search)', { search: `%${search}%` });
    }

    try {
      let users: User[];
      console.log('wp', with_profile);
      if (with_profile && with_profile === 'yes') {
        users = await query
          .leftJoinAndSelect('user.profile', 'profile')
          .getMany();
      } else {
        users = await query.getMany();
      }
      users.forEach((usr) => {
        delete usr.password;
        delete usr.salt;
      });
      return users;
    } catch (error) {
      console.log(
        `Failed to get tasks for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async softDeleteUser(id: number, user: User) {
    if (user.user_role !== 'admin') {
      throw new UnauthorizedException();
    }

    const query = this.createQueryBuilder('user');

    query.where('user.school_id = :school_id', {
      school_id: user.school_id,
    });
    query.andWhere('user.id = :id', { id });
    try {
      const result = await query.softDelete().execute();
      if (result.raw.affectedRows === 1) {
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error.stack);
      throw new InternalServerErrorException();
    }
  }
}
