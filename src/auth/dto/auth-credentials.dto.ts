import { Transform } from 'class-transformer/decorators';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @Transform(parseInt)
  @IsInt({ message: 'Invalid Mobile Number' })
  @Min(9000000000, { message: 'Invalid Mobile Number' })
  @Max(9999999999, { message: 'Invalid Mobile Number' })
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  school_id: string;
}
