import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkerStatus } from '@app/enum';
import { OfficeEntity } from './office.entity';
import { CourseEntity } from './course.entity';
import { WorkerAlarmMessageEntity } from './worker-alarm-message.entity';

@Entity({
  name: 'TBLworker',
  comment: '작업자 정보',
})
export class WorkerEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '작업자 구분 아이디',
  })
  id: number;

  @Column({
    name: 'OfficeID',
    type: 'int',
    comment: '작업자가 속한 검사소 아이디',
  })
  officeID: number;

  @Column({
    name: 'WorkerID',
    type: 'varchar',
    length: 255,
    unique: true,
    comment: '작업자 아이디',
  })
  workerID: string;

  @Column({
    name: 'WorkerPw',
    type: 'varchar',
    length: 255,
    comment: '작업자 비밀번호',
  })
  workerPw: string;

  @Column({
    name: 'WorkerName',
    type: 'varchar',
    length: 255,
    comment: '작업자 이름',
  })
  workerName: string;

  @Column({
    name: 'WorkerStatus',
    type: 'tinyint',
    enum: WorkerStatus,
    comment: '작업자 상태',
  })
  workerStatus: WorkerStatus;

  @Column({
    name: 'WatchToken',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    comment: 'FCM 워치 토큰',
  })
  watchToken: string;

  @Column({
    name: 'MobileToken',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    comment: 'FCM 모바일 토큰',
  })
  mobileToken: string;

  @Column({
    name: 'ExpireAt',
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: '디바이스 토큰 종료일',
  })
  expireAt: Date;

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

  @Column({
    name: 'RemovedAt',
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: '삭제일',
  })
  removedAt: Date;

  @ManyToOne(() => OfficeEntity, (officeEntity) => officeEntity.workers)
  @JoinColumn({
    name: 'OfficeID',
  })
  office: OfficeEntity;

  @ManyToMany(() => CourseEntity, (courseEntity) => courseEntity.workers)
  @JoinTable({
    name: 'TBLworkerCourse',
    joinColumn: {
      name: 'WorkerID',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'CourseID',
      referencedColumnName: 'courseID',
    },
  })
  courses: CourseEntity[];

  @OneToMany(
    () => WorkerAlarmMessageEntity,
    (workerAlarmMessageEntity) => workerAlarmMessageEntity.alertHistory,
  )
  workerAlarmMessages: WorkerAlarmMessageEntity[];
}
