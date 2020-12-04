import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  saveProfile(profileDto: ProfileDto, user: User): Promise<Profile> {
    return this.profileRepository.saveProfile(profileDto, user);
  }

  updateProfile(
    id: number,
    profileDto: ProfileDto,
    user: User,
  ): Promise<Profile> {
    return this.profileRepository.updateProfile(id, profileDto, user);
  }
}
