import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class School extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column()
  address: string;

  @Column({ length: 50, nullable: false })
  telephone: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 50, nullable: false })
  principal: string;

  @Column({ length: 50, nullable: false })
  pmobile: string;

  @Column({ length: 50, nullable: false })
  contact_person: string;

  @Column({ length: 50, nullable: false })
  cmobile: string;

  @Column({ length: 30, nullable: false })
  setting_logging_mode: string;

  @Column({ length: 30, nullable: false })
  setting_video_app_name: string;

  @Column({ type: 'text' })
  info_admission: string;

  @Column({ type: 'text' })
  info_contacts: string;

  @Column({ type: 'text' })
  info_facilities: string;

  @Column({ type: 'text' })
  info_intro: string;

  @Column({ type: 'text' })
  info_messages: string;

  @Column({ type: 'text' })
  info_social: string;
}
