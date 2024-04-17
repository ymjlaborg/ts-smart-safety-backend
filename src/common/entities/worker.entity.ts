import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WorkerStatus } from '../enum';
import { Course } from './course.entity';
import { WorkerAlarmMessage } from './worker-alarm-message.entity';

@Entity({
  name: 'TBLworker',
  comment: '작업자 정보',
})
export class Worker {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '작업자 구분 아이디',
  })
  id: number;

  @Column({
    name: 'officeID',
    type: 'int',
    length: 11,
    comment: '사업소 아이디',
  })
  officeId: number;

  @Column({
    name: 'WorkerID',
    type: 'varchar',
    length: 255,
    comment: '작업자 아이디',
  })
  workerId: string;

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
    length: 4,
    enum: WorkerStatus,
    default: WorkerStatus.Use,
    comment: '작업자 상태',
  })
  workerStatus: WorkerStatus;

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
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'RemovedAt',
    type: 'timestamp',
    nullable: true,
    comment: '삭제일',
  })
  removedAt?: Date;

  @Column({
    name: 'DeviceToken',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '디바이스 토큰',
  })
  deviceToken?: string;

  @Column({
    name: 'ExpireAt',
    type: 'timestamp',
    nullable: true,
  })
  expireAt?: Date;

  @ManyToOne(() => User, (user) => user.workers)
  @JoinColumn({
    name: 'OfficeID',
    referencedColumnName: 'ID',
  })
  user: User;

  @ManyToMany(() => Course, (course) => course.workers)
  @JoinTable({
    name: 'TBLworkerCourse',
    joinColumn: {
      name: 'WorkerID',
      referencedColumnName: 'ID',
    },
    inverseJoinColumn: {
      name: 'CourseID',
      referencedColumnName: 'ID',
    },
  })
  courses: Course[];

  @OneToMany(
    () => WorkerAlarmMessage,
    (workerAlarmMessage) => workerAlarmMessage.worker,
  )
  workerAlarmMessages: WorkerAlarmMessage[];
}
