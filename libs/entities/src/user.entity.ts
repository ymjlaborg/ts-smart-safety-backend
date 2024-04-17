import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Yn } from '@app/enum';
import { Worker } from './worker.entity';
import { Course } from './course.entity';

@Entity({
  name: 'TBLuser',
  comment: '사용자 (사업소)',
})
export class User {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '사용자 (사업소) 구분 아이디',
  })
  id: number;

  @Column({
    name: 'USERID',
    type: 'varchar',
    length: 255,
    comment: '아이디',
  })
  userId: string;

  @Column({
    name: 'USERPW',
    type: 'varchar',
    length: 255,
    comment: '비밀번호',
  })
  userPw: string;

  @Column({
    name: 'USERNAME',
    type: 'varchar',
    length: 255,
    comment: '사업소명',
  })
  userName: string;

  @Column({
    name: 'USEREMAIL',
    type: 'varchar',
    length: 255,
    comment: '이메일',
    nullable: true,
  })
  userEmail?: string;

  @Column({
    name: 'USERHP',
    type: 'varchar',
    length: 255,
    comment: '전화번호',
    nullable: true,
  })
  userHp?: string;

  @Column({
    name: 'ISADMIN',
    type: 'tinyint',
    length: 4,
    enum: Yn,
    default: Yn.N,
    comment: '관리자 여부',
  })
  isAdmin: Yn;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => Worker, (worker) => worker.user)
  workers: Worker[];
}
