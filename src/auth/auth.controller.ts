import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/users')
  @UseGuards(AuthGuard())
  getTasks(
    @Query(ValidationPipe) filterDto: UserFilterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    return this.authService.getUsers(filterDto, user);
  }

  @Delete('/:id/soft/delete')
  @UseGuards(AuthGuard())
  softDelete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.authService.softDelete(id, user);
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
