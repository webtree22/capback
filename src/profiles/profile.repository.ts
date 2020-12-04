import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async saveProfile(profileDto: ProfileDto, user: User) {
    const {
      name,
      class_name,
      section,
      roll,
      email,
      is_banned,
      is_locked,
      is_verified,
      address,
      zoom,
      meet,
      father,
      mother,
      guardian,
    } = profileDto;

    const profile = new Profile();
    profile.name = name;
    profile.class_name = class_name;
    profile.section = section;
    profile.roll = roll;
    profile.email = email;
    profile.is_banned = is_banned;
    profile.is_verified = is_verified;
    profile.is_locked = is_locked;
    profile.address = address;
    profile.zoom = zoom;
    profile.meet = meet;
    profile.father = father;
    profile.mother = mother;
    profile.guardian = guardian;
    profile.user = user;
    await profile.save();
    delete profile.user;
    return profile;
  }

  async updateProfile(id: number, profileDto: ProfileDto, user: User) {
    const {
      name,
      class_name,
      section,
      roll,
      email,
      is_banned,
      is_locked,
      is_verified,
      address,
      zoom,
      meet,
      father,
      mother,
      guardian,
    } = profileDto;

    const profile = await this.findOne(id);
    // const profile = await this.findOne({ where: { id, userId: user.id } });
    if (!profile) {
      throw new NotFoundException();
    }
    console.log(profile.userId !== user.id);
    console.log(user.user_role !== 'admin');
    console.log(id);

    if (profile.userId === user.id || user.user_role === 'admin') {
      console.log(profile);
      profile.name = name;
      profile.class_name = class_name;
      profile.section = section;
      profile.roll = roll;
      profile.email = email;
      profile.is_banned = is_banned;
      profile.is_verified = is_verified;
      profile.is_locked = is_locked;
      profile.address = address;
      profile.zoom = zoom;
      profile.meet = meet;
      profile.father = father;
      profile.mother = mother;
      profile.guardian = guardian;
      await profile.save();
      delete profile.user;
    } else {
      throw new UnauthorizedException(
        `You are not allowed to edit this profile. ${user.user_role}`,
      );
    }
    return profile;
  }
}
