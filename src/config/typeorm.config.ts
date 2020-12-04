import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'cap',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entityPrefix: '',
};
