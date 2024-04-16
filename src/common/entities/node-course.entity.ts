import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from './course.entity';
import { Node } from './node.entity';

@Entity({
  name: 'TBLnodeCourse',
  comment: '노드 별로 진로 저장',
})
export class NodeCourse {
  @PrimaryColumn({
    name: 'CourseId',
    type: 'int',
    length: 11,
    comment: '진로 구분 아이디',
  })
  courseId: number;

  @PrimaryColumn({
    name: 'NodeId',
    type: 'int',
    length: 11,
    comment: '노드 구분 아이디',
  })
  nodeId: number;

  @Column({
    name: 'EntranceType',
    type: 'tinyint',
    length: 4,
  })
  entranceType: number;

  @ManyToOne(() => Course, (course) => course.nodeCourses)
  course: Course;

  @ManyToOne(() => Node, (node) => node.nodeCourses)
  node: Node;
}
