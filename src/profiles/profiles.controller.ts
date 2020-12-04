import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @Post('/save')
  saveProfile(
    @Body(ValidationPipe) profileDto: ProfileDto,
    @GetUser() user: User,
  ): Promise<Profile> {
    return this.profileService.saveProfile(profileDto, user);
  }

  @Patch('/update/:id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) profileDto: ProfileDto,
    @GetUser() user: User,
  ): Promise<Profile> {
    return this.profileService.updateProfile(id, profileDto, user);
  }
}
