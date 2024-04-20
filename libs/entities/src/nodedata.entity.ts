import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'TBLnodedata',
})
export class NodedataEntity {
  @PrimaryColumn({
    name: 'ID',
    type: 'int',
    comment: '노드 데이터 아이디',
  })
  id: number;

  @Column({
    name: 'NodeID',
    type: 'varchar',
    length: 255,
    comment: '노드 아이디',
  })
  nodeID: string;

  @Column({
    name: 'IsManualData',
    type: 'tinyint',
    comment: '노드 아이디',
  })
  isManualData: string;

  @Column({
    name: 'Value',
    type: 'varchar',
    length: 255,
    comment: '숫자 값',
  })
  value: string;

  @Column({
    name: 'ValueStr',
    type: 'varchar',
    length: 255,
    comment: '숫자 값',
  })
  valueStr: string;

  @Column({
    name: 'LTime',
    type: 'timestamp',
    comment: '숫자 값',
  })
  lTime: Date;
}
