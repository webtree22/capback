import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false })
  class_name: string;

  @Column({ length: 50, nullable: false, default: 'A' })
  section: string;

  @Column({ type: 'tinyint' })
  roll: number;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ type: 'tinyint' })
  is_banned: number;

  @Column({ type: 'tinyint' })
  is_locked: number;

  @Column({ type: 'tinyint' })
  is_verified: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 150, nullable: true })
  zoom: string;

  @Column({ length: 150, nullable: true })
  meet: string;

  @Column()
  father: string;

  @Column()
  mother: string;

  @Column()
  guardian: string;

  @DeleteDateColumn({ type: 'int' })
  deleted_date: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;
}
