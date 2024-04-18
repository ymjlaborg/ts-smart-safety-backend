import { CourseEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CourseRepository extends Repository<CourseEntity> {
  constructor(private dataSource: DataSource) {
    super(CourseEntity, dataSource.createEntityManager());
  }

  /**
   * 검사소 아이디로 진로 정보를 가져온다.
   *
   * @param officeID
   * @returns
   */
  async findByOfficeID(officeID: number) {
    const query = this.createQueryBuilder('course')
      .select(['course.courseID', 'course.courseName'])
      .where('course.officeID = :officeID', { officeID });

    return await query.getMany();
  }
}
