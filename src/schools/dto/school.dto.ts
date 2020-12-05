import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SchoolDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  principal: string;

  @IsOptional()
  @IsString()
  pmobile: string;

  @IsOptional()
  @IsString()
  contact_person: string;

  @IsOptional()
  @IsString()
  cmobile: string;

  @IsOptional()
  @IsString()
  setting_logging_mode: string;

  @IsOptional()
  @IsString()
  setting_video_app_name: string;

  @IsOptional()
  @IsString()
  info_admission: string;

  @IsOptional()
  @IsString()
  info_contacts: string;

  @IsOptional()
  @IsString()
  info_facilities: string;

  @IsOptional()
  @IsString()
  info_intro: string;

  @IsOptional()
  @IsString()
  info_messages: string;

  @IsOptional()
  @IsString()
  info_social: string;
}
