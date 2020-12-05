import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { SchoolFilterDto } from './dto/school-filter.dto';
import { SchoolDto } from './dto/school.dto';
import { SchoolRepository } from './school.repository';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(SchoolRepository)
    private schoolRepository: SchoolRepository,
  ) {}

  getSchools(schoolFilterDto: SchoolFilterDto) {
    return this.schoolRepository.getSchools(schoolFilterDto);
  }

  saveSchool(schoolDto: SchoolDto, user: User) {
    return this.schoolRepository.saveSchool(schoolDto, user);
  }

  updateSchool(id: string, schoolDto: SchoolDto, user: User) {
    return this.schoolRepository.updateSchool(id, schoolDto, user);
  }
}
