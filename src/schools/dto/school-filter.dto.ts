import { IsOptional, IsString } from 'class-validator';

export class SchoolFilterDto {
  @IsOptional()
  @IsString()
  name: string;
}
