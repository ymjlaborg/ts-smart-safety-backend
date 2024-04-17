import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlertLevel, AlertType, EntranceType } from '../enum';
import { Course } from './course.entity';
import { WorkerAlarmMessage } from './worker-alarm-message.entity';

@Entity({
  name: 'AlertHistory',
  comment: '경고 이력 저장',
})
export class AlertHistory {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '경고 아이디',
  })
  id: number;

  @Column({
    name: 'LTime',
    type: 'timestamp',
    comment: '경고 발생 시간',
  })
  lTime: Date;

  @Column({
    name: 'DeviceID',
    type: 'varchar',
    length: 255,
    comment: '디바이스 아이디',
  })
  deviceID: string;

  @Column({
    name: 'NodeID',
    type: 'varchar',
    length: 255,
    comment: '노드 아이디',
  })
  nodeID: string;

  @Column({
    name: 'AlertLevel',
    type: 'int',
    length: 11,
    enum: AlertLevel,
    comment: '경고 단계',
  })
  alertLevel: AlertLevel;

  @Column({
    name: 'AlertTitle',
    type: 'varchar',
    length: 255,
    comment: '경고 제목',
  })
  alertTitle: string;

  @Column({
    name: 'AlertDataValue',
    type: 'varchar',
    length: 255,
    comment: '경고 내용',
  })
  alertDataValue: string;

  @Column({
    name: 'CourseID',
    type: 'int',
    length: 11,
    comment: '진로 구분 아이디',
  })
  courseID: number;

  @Column({
    name: 'AlertType',
    type: 'int',
    length: 11,
    enum: AlertType,
    comment: '경고 구분',
  })
  alertType: AlertType;

  @Column({
    name: 'EntranceType',
    type: 'tinyint',
    length: 4,
    enum: EntranceType,
    nullable: true,
    comment: '경고 구분',
  })
  entranceType?: EntranceType;

  @ManyToOne(() => Course, (course) => course.alertHistories)
  @JoinColumn({
    name: 'CourseID',
    referencedColumnName: 'ID',
  })
  course: Course;

  @OneToMany(
    () => WorkerAlarmMessage,
    (workerAlarmMessage) => workerAlarmMessage.alertHistory,
  )
  workerAlarmMessages: WorkerAlarmMessage[];
}
