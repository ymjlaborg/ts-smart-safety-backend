import { AlertHistoryEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NodeRepository } from './node.repository';

@Injectable()
export class AlertHistoryRepository extends Repository<AlertHistoryEntity> {
  constructor(
    private dataSource: DataSource,
    private nodeRepository: NodeRepository,
  ) {
    super(AlertHistoryEntity, dataSource.createEntityManager());
  }

  /**
   * 아이디로 해당 알림 가져오기
   *
   * @param id
   */
  async findById(id: number) {
    const query = this.createQueryBuilder('a')
      .innerJoin('a.course', 'c')
      .innerJoin('c.office', 'u')
      .innerJoin('a.node', 'n')
      .select([
        'a.id',
        'a.lTime',
        'a.alertLevel',
        'a.alertTitle',
        'a.alertContent',
        'a.alertType',
        'a.entranceType',
        'a.AlertDataValue',
        'c.courseID',
        'c.courseName',
        'u.officeID',
        'u.officeName',
        'n.nodeID',
        'n.nodeName',
        'n.nodeUnit',
        'n.devID',
        'n.dataDateEnd',
        'n.dataCnt',
      ])
      .where('a.id = :id', { id });

    return await query.getOne();
  }

  /**
   * 알림 총 갯수
   *
   * @returns
   */
  async countAll() {
    const query = this.createQueryBuilder('a').innerJoin('a.course', 'c');

    return await query.getCount();
  }

  /**
   * 알림의 목록을 가져온다.
   * @returns
   */
  async findAll() {
    const query = this.createQueryBuilder('a')
      .innerJoin('a.course', 'c')
      .orderBy('a.lTime', 'DESC');

    return await query.getMany();
  }
}
