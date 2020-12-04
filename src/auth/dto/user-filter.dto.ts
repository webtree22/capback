import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../user-roles.enum';

export class UserFilterDto {
  @IsOptional()
  @IsIn([UserRoles.ADMIN, UserRoles.STUDENT, UserRoles.TEACHER])
  user_role: UserRoles;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  with_profile: string;
}
