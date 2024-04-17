import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NodeCourse } from './node-course.entity';
import { Worker } from './worker.entity';
import { User } from './user.entity';
import { AlertHistory } from './alert-history.entity';

@Entity({
  name: 'TBLcourse',
  comment: '사업소 별 진로 저장',
})
export class Course {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '진로 구분 아이디',
  })
  id: number;

  @Column({
    name: 'OfficeID',
    type: 'int',
    length: 11,
    comment: '사업소 아이디',
  })
  officeId: number;

  @Column({
    name: 'CourseName',
    type: 'varchar',
    length: 255,
    comment: '진로명',
  })
  courseName: string;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
    comment: '등록일',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'timestamp',
    comment: '수정일',
  })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({
    name: 'OfficeID',
    referencedColumnName: 'ID',
  })
  user: User;

  @OneToMany(() => NodeCourse, (nodeCourse) => nodeCourse.node)
  nodeCourses: NodeCourse[];

  @ManyToMany(() => Worker, (worker) => worker.courses)
  workers: Worker[];

  @OneToMany(() => AlertHistory, (alertHistory) => alertHistory.course)
  alertHistories: AlertHistory[];
}
