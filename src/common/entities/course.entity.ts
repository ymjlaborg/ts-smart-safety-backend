import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NodeCourse } from './node-course.entity';

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

  @OneToMany(() => NodeCourse, (nodeCourse) => nodeCourse.node)
  nodeCourses: NodeCourse[];
}
