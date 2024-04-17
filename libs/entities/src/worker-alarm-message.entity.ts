import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlertHistory } from './alert-history.entity';
import { Worker } from './worker.entity';

@Entity({
  name: 'TBLworkerAlarmMessage',
})
export class WorkerAlarmMessage {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '알림 구분 아이디',
  })
  id: number;

  @Column({
    name: 'AlertHistoryID',
    type: 'int',
    length: 11,
    comment: '경고 구분 아이디',
  })
  alertHistoryID: number;

  @Column({
    name: 'WorkerID',
    type: 'int',
    length: 11,
    comment: '작업자 구분 아이디',
  })
  workerID: number;

  @Column({
    name: 'ReadAt',
    type: 'timestamp',
    nullable: true,
    comment: '읽은 시간',
  })
  readAt?: Date;

  @Column({
    name: 'MessageID',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '메시지 아이디',
  })
  MessageID?: string;

  @Column({
    name: 'DeliveryStatus',
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '전달 상태',
  })
  deliveryStatus: string;

  @Column({
    name: 'SendAt',
    type: 'timestamp',
    nullable: true,
    comment: '전송 시간',
  })
  sendAt: Date;

  @Column({
    name: 'SendCount',
    type: 'int',
    length: 11,
    default: 1,
    comment: '재전송 카운트',
  })
  sendCount: number;

  @ManyToOne(
    () => AlertHistory,
    (alertHistory) => alertHistory.workerAlarmMessages,
  )
  @JoinColumn({
    name: 'AlertHistoryID',
    referencedColumnName: 'ID',
  })
  alertHistory: AlertHistory;

  @ManyToOne(() => Worker, (worker) => worker.workerAlarmMessages)
  @JoinColumn({
    name: 'WorkerID',
    referencedColumnName: 'ID',
  })
  worker: Worker;
}
