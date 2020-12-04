import { Transform } from 'class-transformer/decorators';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  class_name: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @Transform(parseInt)
  @IsInt()
  roll: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @Transform(parseInt)
  @IsInt()
  is_banned: number;

  @Transform(parseInt)
  @IsInt()
  is_locked: number;

  @Transform(parseInt)
  @IsInt()
  is_verified: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  zoom: string;

  @IsString()
  @IsOptional()
  meet: string;

  @IsString()
  @IsOptional()
  father: string;

  @IsString()
  @IsOptional()
  mother: string;

  @IsString()
  @IsOptional()
  guardian: string;
}
