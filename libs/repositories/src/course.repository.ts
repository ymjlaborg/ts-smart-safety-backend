import { CourseEntity } from '@app/entities';
import { Yn } from '@app/enum';
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

  /**
   * 진로별 카메라 정보 가져오기
   * @param officeID
   * @returns
   */
  async findCamerasByOfficeID(
    officeID: number,
    useWaitingRoom: boolean = false,
  ) {
    const query = this.createQueryBuilder('c')
      .innerJoin('c.nodeCourses', 'nc')
      .innerJoin('nc.node', 'n')
      .innerJoin('n.cameras', 'tc')
      .where('c.officeID = :officeID', { officeID })
      .select([
        'c.courseID',
        'c.courseName',
        'nc.courseID',
        'nc.entranceType',
        'n.nodeName',
        'tc.id',
        'tc.useWaitingRoom',
        'tc.streamingUrl',
      ]);

    if (useWaitingRoom) {
      query.andWhere('tc.useWaitingRoom = :Yn', { Yn: Yn.Y });
    }

    return (await query.getMany()).map((course) => {
      const { courseID, courseName, nodeCourses } = course;

      const camera = nodeCourses.map((nodeCourse) => {
        const { entranceType, node } = nodeCourse;
        return {
          entranceType,
          ...node.cameras[0],
          nodeName: node.nodeName,
        };
      });

      return {
        courseID,
        courseName,
        camera,
      };
    });
  }
}
