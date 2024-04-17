import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Node } from './node.entity';
import { Yn } from '@app/enum';

@Entity({
  name: 'TBLcamera',
  comment: '카메라 정보',
})
export class Camera {
  @Column({
    name: 'NodeID',
    type: 'varchar',
    length: 255,
    comment: '카메라 노드 아이디',
  })
  nodeId: string;

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
    length: 4,
    enum: Yn,
    default: Yn.N,
    comment: '고객 대기실 여부',
  })
  useWaitingRoom: Yn;

  @ManyToOne(() => Node, (node) => node.cameras)
  @JoinColumn({
    name: 'NodeID',
    referencedColumnName: 'NodeID',
  })
  node: Node;
}
