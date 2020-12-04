import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = {
      username: user.username,
      role: user.user_role,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async getUsers(filterDto: UserFilterDto, user: User): Promise<User[]> {
    return this.userRepository.getUsers(filterDto, user);
  }

  async softDelete(id: number, user: User) {
    return await this.userRepository.softDeleteUser(id, user);
  }
}
