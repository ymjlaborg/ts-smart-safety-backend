import { Yn } from '@app/enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NodeEntity } from './node.entity';

@Entity({
  name: 'TBLcamera',
})
export class CameraEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '카메라 정보 아이디',
  })
  id: number;

  @Column({
    name: 'NodeID',
    type: 'int',
    comment: '카메라 노드 아이디',
  })
  nodeID: string;

  @Column({
    name: 'StreamingUrl',
    type: 'varchar',
    length: 255,
    comment: '카메라 스트리밍 URL',
  })
  streamingUrl: string;

  @Column({
    name: 'UseWaitingRoom',
    type: 'tinyint',
    enum: Yn,
    comment: '고객 대기실에 표시될 카메라 여부',
  })
  useWaitingRoom: Yn;

  @ManyToOne(() => NodeEntity, (nodeEntity) => nodeEntity.cameras)
  @JoinColumn({
    name: 'NodeID',
  })
  node: NodeEntity;
}
