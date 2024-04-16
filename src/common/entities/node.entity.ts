import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NodeType, NodeValue } from '../enum';
import { Camera } from './camera.entity';
import { NodeCourse } from './node-course.entity';

@Entity({
  name: 'TBLnode',
  comment: '노드 항목',
})
export class Node {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: '노드 아이디',
  })
  id: number;

  @Column({
    name: 'DevID',
    type: 'varchar',
    length: 255,
    comment: '노드 디바이스 아이디',
  })
  devId: string;

  @Column({
    name: 'NodeID',
    type: 'varchar',
    length: 255,
    comment: '노드 고유 아이디 / DevID + NodeName + NodeType',
  })
  nodeId: string;

  @Column({
    name: 'NodeName',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  nodeName?: string;

  @Column({
    name: 'NodeType',
    type: 'tinyint',
    length: 11,
    enum: NodeType,
    comment: '노드 타입',
  })
  nodeType: NodeType;

  @Column({
    name: 'NodeValue',
    type: 'tinyint',
    length: 4,
    enum: NodeValue,
    comment: '노드 값 형태',
  })
  nodeValue: NodeValue;

  @Column({
    name: 'NodeUnit',
    type: 'varchar',
    length: 100,
    comment: '노드 단위',
  })
  nodeUnit: string;

  @Column({
    name: 'DateCnt',
    type: 'bigint',
    length: 20,
    default: 0,
    comment: '데이터 수신 수',
  })
  dateCnt: number;

  @Column({
    name: 'DataDateStart',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '첫 수신 일',
  })
  dataDateStart?: Date;

  @Column({
    name: 'DataDateEnd',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '마지막 수신 일',
  })
  dataDateEnd?: Date;

  @OneToMany(() => Camera, (camera) => camera.node, {
    eager: false,
    nullable: true,
  })
  cameras: Camera[];

  @OneToMany(() => NodeCourse, (nodeCourse) => nodeCourse.node)
  nodeCourses: NodeCourse[];
}
