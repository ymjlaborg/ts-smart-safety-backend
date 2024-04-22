import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AlertHistoryEntity } from './alert-history.entity';

@Entity({
  name: 'TBLnode',
  comment: 'Node 정보',
})
export class NodeEntity {
  @PrimaryColumn({
    name: 'ID',
    type: 'int',
    comment: '노드 구분 아이디',
  })
  id: number;

  @Column({
    name: 'DevID',
    type: 'varchar',
    length: 255,
    comment: '디바이스 아이디',
  })
  devID: string;

  @Column({
    name: 'NodeID',
    type: 'varchar',
    // length: 255,
    comment: '노드 아이디',
  })
  nodeID: string;

  @Column({
    name: 'NodeName',
    type: 'varchar',
    length: 255,
    comment: '노드 이름',
  })
  nodeName: string;

  @Column({
    name: 'NodeType',
    type: 'tinyint',
    comment: '노드 타입',
  })
  nodeType: number;

  @Column({
    name: 'NodeValue',
    type: 'tinyint',
    comment: '노드 값의 타입',
  })
  nodeValue: number;

  @Column({
    name: 'NodeUnit',
    type: 'varchar',
    length: 10,
    comment: '노드의 단위',
  })
  nodeUnit: string;

  @Column({
    name: 'DataCnt',
    type: 'bigint',
    default: 0,
    comment: '데이터 전송 횟수',
  })
  dataCnt: number;

  @Column({
    name: 'DataDateStart',
    type: 'datetime',
    comment: '데이터 전달 받은 시작일',
  })
  dataDateStart: Date;

  @Column({
    name: 'DataDateEnd',
    type: 'datetime',
    comment: '데이터 전달 마지막 일',
  })
  dataDateEnd: Date;

  @OneToMany(
    () => AlertHistoryEntity,
    (alertHistoryEntity) => alertHistoryEntity.node,
  )
  alertHistories: AlertHistoryEntity[];
}
