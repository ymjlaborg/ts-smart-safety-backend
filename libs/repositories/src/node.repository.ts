import { NodeEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class NodeRepository extends Repository<NodeEntity> {
  constructor(private dataSource: DataSource) {
    super(NodeEntity, dataSource.createEntityManager());
  }

  /**
   * 진로 아이디로 node를 찾는다.
   *
   * @param courseId
   */
  async findByCourseIDAndNodeNames(courseID: number, nodeNames: string[]) {
    const query = this.createQueryBuilder('node')
      .innerJoin(
        'node.nodeCourses',
        'nc',
        'nc.courseID = :courseID AND nc.EntranceType = 0',
        {
          courseID,
        },
      )
      .select('node.nodeName')
      .addSelect('node.devID')
      .where("node.devID LIKE 'TS_IoT%'");

    const conditions = nodeNames.map(
      (nodeName: string) => `node.nodeName LIKE '%${nodeName}%'`,
    );

    query.andWhere(`(${conditions.join(' OR ')})`);

    return await query.getMany();
  }
}
