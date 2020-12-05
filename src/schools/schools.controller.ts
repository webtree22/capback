import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { SchoolFilterDto } from './dto/school-filter.dto';
import { SchoolDto } from './dto/school.dto';
import { SchoolsService } from './schools.service';

@Controller('schools')
@UseGuards(AuthGuard())
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  getSchools(@Query() schoolFilterDto: SchoolFilterDto) {
    return this.schoolsService.getSchools(schoolFilterDto);
  }

  @Post('/save')
  saveSchool(
    @Body(ValidationPipe) schoolDto: SchoolDto,
    @GetUser() user: User,
  ) {
    return this.schoolsService.saveSchool(schoolDto, user);
  }

  @Patch('/update/:id')
  updateSchool(
    @Param('id') id: string,
    @Body(ValidationPipe) schoolDto: SchoolDto,
    @GetUser() user: User,
  ) {
    return this.schoolsService.updateSchool(id, schoolDto, user);
  }

  /*
    School Deletion Issue
    When you HAVE to delete a school, 
      i. backup all data belogining to that school
      ii. delete all data pertaining to that school including users, classes, subjects, etc
      iii. then delete the school
  */
}
