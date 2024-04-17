import { Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'TBLnodedata',
  comment: '노드 데이터',
})
export class NodeData {
  @PrimaryColumn({
    name: 'ID',
    type: 'int',
    length: 11,
    comment: '노드 데이터 아이디',
  })
  id: number;
}
