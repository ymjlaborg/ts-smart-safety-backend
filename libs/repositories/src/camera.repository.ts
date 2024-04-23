import {
  CameraEntity,
  CourseEntity,
  NodeCourseEntity,
  NodeEntity,
  OfficeEntity,
} from '@app/entities';
import { Yn } from '@app/enum';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CameraRepository extends Repository<CameraEntity> {
  constructor(private dataSource: DataSource) {
    super(CameraEntity, dataSource.createEntityManager());
  }

  /**
   * 카메라 정보를 가져온다.
   *
   * @param officeID
   * @param useWaitingRoom
   * @returns
   */
  async findAllByOfficeID(officeID: number, useWaitingRoom?: Yn) {
    const query = this.createQueryBuilder('camera')
      .innerJoinAndMapOne(
        'camera.node',
        NodeEntity,
        'node',
        'camera.nodeID = node.id',
      )
      .innerJoinAndMapMany(
        'node.nodeCourses',
        NodeCourseEntity,
        'nc',
        'nc.nodeID = node.id',
      )
      .innerJoinAndMapOne(
        'nc.course',
        CourseEntity,
        'c',
        'c.courseID = nc.courseID',
      )
      .innerJoinAndMapOne(
        'c.office',
        OfficeEntity,
        'o',
        'o.officeID = c.officeID',
      )
      .where('o.officeID = :officeID', { officeID });

    if (useWaitingRoom === Yn.Y) {
      query.andWhere('camera.useWaitingRoom = :useWaitingRoom', {
        useWaitingRoom,
      });
    }

    query.orderBy('camera.id', 'DESC');

    return (await query.getMany()).map((camera) => {
      const { id, streamingUrl, useWaitingRoom, node } = camera;
      const { nodeName, nodeCourses } = node;
      const courses = nodeCourses.map(({ course }) => ({
        courseID: course.courseID,
        courseName: course.courseName,
      }));

      return {
        id,
        streamingUrl,
        useWaitingRoom,
        nodeID: node.id,
        nodeName,
        courses,
      };
    });
  }
}
