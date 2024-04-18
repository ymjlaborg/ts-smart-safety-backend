import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OfficeEntity } from './office.entity';
import { WorkerEntity } from './worker.entity';

@Entity({
  name: 'TBLcourse',
  comment: '사업소 별 진로 저장',
})
export class CourseEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '진로 구분 아이디',
  })
  courseID: number;

  @Column({
    name: 'OfficeID',
    type: 'int',
    comment: '사업소 아이디',
  })
  officeID: number;

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
    comment: '생성일',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UpdatedAt',
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: '수정일',
  })
  updatedAt: Date;

  @ManyToOne(() => OfficeEntity, (officeEntity) => officeEntity.courses)
  @JoinColumn({
    name: 'OfficeID',
  })
  office: OfficeEntity;

  @ManyToMany(() => WorkerEntity, (workerEntity) => workerEntity.courses)
  workers: WorkerEntity[];
}
