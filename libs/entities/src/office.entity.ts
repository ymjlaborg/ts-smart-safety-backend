import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkerEntity } from './worker.entity';
import { CourseEntity } from './course.entity';

@Entity({
  name: 'TBLuser',
  comment: '자동차 검사소 테이블',
})
export class OfficeEntity {
  @PrimaryColumn({
    name: 'ID',
    type: 'int',
    comment: '검사소 구분 아이디',
  })
  officeID: number;

  @Column({
    name: 'USERNAME',
    type: 'varchar',
    length: 255,
    comment: '검사소 명',
  })
  officeName: string;

  @Column({
    name: 'ISADMIN',
    type: 'tinyint',
    default: 0,
    comment: '관리자 여부',
  })
  isAdmin: number;

  @OneToMany(() => WorkerEntity, (workerEntity) => workerEntity.office)
  workers: WorkerEntity[];

  @OneToMany(() => CourseEntity, (courseEntity) => courseEntity.office)
  courses: CourseEntity[];
}
