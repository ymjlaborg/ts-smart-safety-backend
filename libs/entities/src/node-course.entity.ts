import { EntranceType } from '@app/enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { NodeEntity } from './node.entity';

@Entity({
  name: 'TBLnodeCourse',
})
export class NodeCourseEntity {
  @PrimaryColumn({
    name: 'CourseID',
    type: 'int',
    comment: '진로 구분 아이디',
  })
  courseID: number;

  @PrimaryColumn({
    name: 'NodeID',
    type: 'int',
    comment: '노드 구분 아이디',
  })
  nodeID: number;

  @Column({
    name: 'EntranceType',
    type: 'tinyint',
    enum: EntranceType,
    nullable: true,
    default: null,
    comment: '입출구 구분',
  })
  entranceType: EntranceType;

  @ManyToOne(() => CourseEntity, (courseEntity) => courseEntity.nodeCourses)
  @JoinColumn({
    name: 'CourseID',
  })
  course: CourseEntity;

  @ManyToOne(() => NodeEntity, (nodeEntity) => nodeEntity.nodeCourses)
  @JoinColumn({
    name: 'NodeID',
  })
  node: NodeEntity;
}
