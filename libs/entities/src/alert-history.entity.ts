import { AlertLevel, AlertType, EntranceType } from '@app/enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { WorkerAlarmMessageEntity } from './worker-alarm-message.entity';
import { NodeEntity } from './node.entity';

@Entity({
  name: 'AlertHistory',
})
export class AlertHistoryEntity {
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
    // length: 255,
    comment: '노드 아이디',
  })
  nodeID: string;

  @Column({
    name: 'AlertLevel',
    type: 'int',
    enum: AlertType,
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
    name: 'AlertContent',
    type: 'varchar',
    length: 255,
    comment: '경고 내용',
  })
  alertContent: string;

  @Column({
    name: 'AlertDataValue',
    type: 'varchar',
    length: 255,
    comment: '노드의 값',
  })
  alertDataValue: string;

  @Column({
    name: 'CourseID',
    type: 'int',
    comment: '발생 진로 아이디',
  })
  courseID: number;

  @Column({
    name: 'AlertType',
    type: 'int',
    enum: AlertType,
    comment: '경고 구분',
  })
  alertType: AlertType;

  @Column({
    name: 'EntranceType',
    type: 'tinyint',
    enum: EntranceType,
    nullable: true,
    comment: '출입구 확인',
  })
  entranceType: EntranceType;

  @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.alertHistories)
  @JoinColumn({
    name: 'CourseID',
  })
  course: CourseEntity;

  @OneToMany(
    () => WorkerAlarmMessageEntity,
    (workerAlarmMessageEntity) => workerAlarmMessageEntity.alertHistory,
  )
  workerAlarmMessages: WorkerAlarmMessageEntity[];

  @ManyToOne(() => NodeEntity, (nodeEntity) => nodeEntity.alertHistories)
  @JoinColumn({
    name: 'NodeID',
    referencedColumnName: 'nodeID',
  })
  node: NodeEntity;
}
