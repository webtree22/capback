import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SchoolFilterDto } from './dto/school-filter.dto';
import { SchoolDto } from './dto/school.dto';
import { School } from './school.entity';

@EntityRepository(School)
export class SchoolRepository extends Repository<School> {
  async saveSchool(schoolDto: SchoolDto, user: User) {
    if (user.user_role !== 'superadmin') {
      throw new UnauthorizedException('only sa allowed');
    }

    const {
      id,
      name,
      address,
      telephone,
      email,
      principal,
      pmobile,
      contact_person,
      cmobile,
      setting_logging_mode,
      setting_video_app_name,
      info_admission,
      info_contacts,
      info_facilities,
      info_intro,
      info_messages,
      info_social,
    } = schoolDto;

    const school = new School();
    school.id = id;
    school.name = name;
    school.address = address;
    school.telephone = telephone;
    school.email = email;
    school.principal = principal;
    school.pmobile = pmobile;
    school.contact_person = contact_person;
    school.cmobile = cmobile;
    school.setting_logging_mode = setting_logging_mode;
    school.setting_video_app_name = setting_video_app_name;
    school.info_admission = info_admission;
    school.info_contacts = info_contacts;
    school.info_facilities = info_facilities;
    school.info_intro = info_intro;
    school.info_messages = info_messages;
    school.info_social = info_social;
    await school.save();
    return school;
  }

  async updateSchool(idfromroute: string, schoolDto: SchoolDto, user: User) {
    const {
      id,
      name,
      address,
      telephone,
      email,
      principal,
      pmobile,
      contact_person,
      cmobile,
      setting_logging_mode,
      setting_video_app_name,
      info_admission,
      info_contacts,
      info_facilities,
      info_intro,
      info_messages,
      info_social,
    } = schoolDto;
    if (idfromroute !== id) {
      throw new UnauthorizedException('route id <> body id');
    }
    const school = await this.findOne(id);
    if (!school) {
      throw new NotFoundException();
    }
    if (user.school_id === id || user.user_role === 'superadmin') {
      school.name = name;
      school.address = address;
      school.telephone = telephone;
      school.email = email;
      school.principal = principal;
      school.pmobile = pmobile;
      school.contact_person = contact_person;
      school.cmobile = cmobile;
      school.setting_logging_mode = setting_logging_mode;
      school.setting_video_app_name = setting_video_app_name;
      school.info_admission = info_admission;
      school.info_contacts = info_contacts;
      school.info_facilities = info_facilities;
      school.info_intro = info_intro;
      school.info_messages = info_messages;
      school.info_social = info_social;
      await school.save();
      return school;
    } else {
      throw new UnauthorizedException('update either own school or superadmin');
    }
  }

  async getSchools(schoolFilterDto: SchoolFilterDto) {
    const { name } = schoolFilterDto;
    const query = this.createQueryBuilder('school');
    if (name) {
      query.where('school.name LIKE :name', { name: `%${name}%` });
    }
    return await query.getMany();
  }
}
