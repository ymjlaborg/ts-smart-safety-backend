import { AlertHistoryEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { NodeRepository } from './node.repository';
import { ListAlertDto } from 'src/apis/control/alert/dto/list-alert.dto';
import * as dayjs from 'dayjs';

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
  async findAll(officeID: number, params: ListAlertDto) {
    const query = this.createQueryBuilder('ah')
      .select([
        'ah.id',
        'ah.alertLevel',
        'ah.alertTitle',
        'ah.alertContent',
        'ah.entranceType',
        'c.courseID',
        'c.courseName',
      ])
      .innerJoin('ah.course', 'c');

    query.where('c.officeID = :officeID', { officeID });

    // 레벨 전달
    if (params.levels) {
      if (params.levels instanceof Array) {
        query.andWhere('ah.alertLevel IN (:...levels)', {
          levels: params.levels,
        });
      } else {
        query.andWhere('ah.alertLevel = :level', { level: params.levels });
      }
    }

    // 코스 전달
    if (params.courses) {
      if (params.levels instanceof Array) {
        query.andWhere('c.courseID IN (:...courses)', {
          courses: params.courses,
        });
      } else {
        query.andWhere('ah.courseID = :courses', { courses: params.courses });
      }
    }

    const startDate = dayjs(params.startDate)
      .hour(0)
      .minute(0)
      .second(0)
      .format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(params.endDate)
      .hour(23)
      .minute(59)
      .second(59)
      .format('YYYY-MM-DD HH:mm:ss');

    query.andWhere({ lTime: Between(startDate, endDate) });

    query.limit(params.limit);
    query.take(params.offset);

    query.orderBy('ah.lTime', 'DESC');
    query.addOrderBy('ah.id', 'DESC');

    return await query.getMany();
  }
}
