import { AlertHistoryEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { NodeRepository } from './node.repository';
import * as dayjs from 'dayjs';
import { ListAlertDto } from 'src/apis/control/common/dto/list-alert.dto';

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
  async countAll(officeID: number, params: ListAlertDto) {
    const query = this.createQueryBuilder('ah').innerJoin('ah.course', 'c');
    this.generateAllQuery(query, officeID, params);
    const count = await query.getCount();
    console.log('COUNT ALL');

    console.log(count);

    return count;
  }

  /**
   * 알림의 목록을 가져온다.
   * @returns
   */
  async findAll(officeID: number, params: ListAlertDto) {
    const query = this.createQueryBuilder('ah')
      .select([
        'ah.id',
        'ah.lTime',
        'ah.alertLevel',
        'ah.alertTitle',
        'ah.alertContent',
        'ah.entranceType',
        'ah.alertType',
        'c.courseID',
        'c.courseName',
      ])
      .innerJoin('ah.course', 'c');

    console.log('FIND ALL');

    this.generateAllQuery(query, officeID, params);

    query.skip(params.offset);
    query.take(params.limit);

    query.orderBy('ah.lTime', 'DESC');

    return await query.getMany();
  }

  /**
   *
   * @param query
   * @param officeID
   * @param params
   */
  private generateAllQuery(
    query: SelectQueryBuilder<AlertHistoryEntity>,
    officeID: number,
    params: ListAlertDto,
  ) {
    query.where('c.officeID = :officeID', { officeID });
    // 레벨 전달
    if (params.levels) {
      console.log(params.levels);

      if (params.levels instanceof Array) {
        console.log('qweqwe');
        query.andWhere('ah.alertLevel IN (:...levels)', {
          levels: params.levels,
        });
      } else {
        query.andWhere('ah.alertLevel = :level', { level: params.levels });
      }
    }

    // 코스 전달
    if (params.courses) {
      console.log(params.courses);

      if (params.courses instanceof Array) {
        query.andWhere('c.courseID IN (:...courses)', {
          courses: params.courses,
        });
      } else {
        query.andWhere('ah.courseID = :courses', { courses: params.courses });
      }
    }

    if (params.types) {
      if (params.types instanceof Array) {
        query.andWhere('ah.alertType IN (:...types)', {
          types: params.types,
        });
      } else {
        query.andWhere('ah.alertType = :alertType', {
          alertType: params.types,
        });
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

    query.andWhere('ah.lTime BETWEEN :startDate AND :endDate', {
      startDate,
      endDate,
    });
  }
}
