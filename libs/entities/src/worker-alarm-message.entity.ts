import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkerEntity } from './worker.entity';
import { AlertHistoryEntity } from './alert-history.entity';

@Entity({
  name: 'TBLworkerAlarmMessage',
  comment: '작업자 알림 목록',
})
export class WorkerAlarmMessageEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '알림 구분 아이디',
  })
  id: number;

  @Column({
    name: 'AlertHistoryID',
    type: 'int',
    comment: '경고 구분 아이디',
  })
  alertHistoryID: number;

  @Column({
    name: 'WorkerID',
    type: 'int',
    comment: '작업자 구분 아이디',
  })
  workerID: number;

  @Column({
    name: 'readAt',
    type: 'timestamp',
    nullable: true,
    comment: '읽은 시간',
  })
  readAt: Date;

  @Column({
    name: 'MessageID',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '메시지 아이디',
  })
  messageID: string;

  @Column({
    name: 'DeliveryStatus',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '전달 상태',
  })
  deliveryStatus: string;

  @Column({
    name: 'SendAt',
    type: 'timestamp',
    nullable: true,
    comment: '최종 전달 시간',
  })
  sendAt: Date;

  @Column({
    name: 'SendCount',
    type: 'int',
    default: 1,
    comment: '최종 전달 시간',
  })
  sendCount: Date;

  @ManyToOne(
    () => AlertHistoryEntity,
    (alertHistoryEntity) => alertHistoryEntity.workerAlarmMessages,
  )
  @JoinColumn({
    name: 'AlertHistoryID',
  })
  alertHistory: AlertHistoryEntity;

  @ManyToOne(
    () => WorkerEntity,
    (workerEntity) => workerEntity.workerAlarmMessages,
  )
  @JoinColumn({
    name: 'WorkerID',
  })
  worker: WorkerEntity;
}
