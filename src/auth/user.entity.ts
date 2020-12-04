import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/profiles/profile.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  school_id: string; //id string eg mntglory, dhs, sbes, neelgiri

  @Column()
  user_role: string;

  @Column()
  salt: string;

  @DeleteDateColumn({ type: 'int' })
  deleted_date: number;

  @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
  profile: Profile;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

// special columns

// @CreateDateColumn is a special column that is automatically set to the entity's insertion date. You don't need to set this column - it will be automatically set.

// @UpdateDateColumn is a special column that is automatically set to the entity's update time each time you call save of entity manager or repository. You don't need to set this column - it will be automatically set.

// @DeleteDateColumn is a special column that is automatically set to the entity's delete time each time you call soft-delete of entity manager or repository. You don't need to set this column - it will be automatically set. If the @DeleteDateColumn is set, the default scope will be "non-deleted".

// @VersionColumn is a special column that is automatically set to the version of the entity (incremental number) each time you call save of entity manager or repository. You don't need to set this column - it will be automatically set.
