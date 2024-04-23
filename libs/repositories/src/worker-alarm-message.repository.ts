import { WorkerAlarmMessageEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { ListAlertDto } from 'src/apis/worker/alert/dto/list-alert.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkerAlarmMessageRepository extends Repository<WorkerAlarmMessageEntity> {
  constructor(private dataSource: DataSource) {
    super(WorkerAlarmMessageEntity, dataSource.createEntityManager());
  }

  async countAllByWorker(workerID: number, listDto: ListAlertDto) {
    const query = this.createQueryBuilder('tam')
      .innerJoin('tam.alertHistory', 'ah')
      .where('tam.workerID = :workerID', { workerID });

    if (listDto.levels) {
      if (listDto.levels instanceof Array) {
        query.andWhere('ah.alertLevel IN (:...levels)', {
          levels: listDto.levels,
        });
      } else {
        query.andWhere('ah.alertLevel = :level', { level: listDto.levels });
      }
    }

    return await query.getCount();
  }

  async findAllByWorker(workerID: number, listDto: ListAlertDto) {
    const query = this.createQueryBuilder('tam')
      .select([
        'tam.id',
        'ah.alertLevel',
        'ah.alertTitle',
        'ah.alertContent',
        'ah.entranceType',
        'tam.readAt',
        'tam.sendAt',
        'tc.courseID',
        'tc.courseName',
      ])
      .innerJoin('tam.alertHistory', 'ah')
      .innerJoin('ah.course', 'tc')
      .where('tam.workerID = :workerID', { workerID });

    if (listDto.levels) {
      if (listDto.levels instanceof Array) {
        query.andWhere('ah.alertLevel IN (:...levels)', {
          levels: listDto.levels,
        });
      } else {
        query.andWhere('ah.alertLevel = :level', { level: listDto.levels });
      }
    }

    query.skip(listDto.offset);
    query.take(listDto.limit);

    let sort: string;

    if (listDto.sort === 'level') {
      sort = 'ah.alertLevel';
    } else if (listDto.sort === 'readAt') {
      sort = 'tam.readAt';
    } else if (listDto.sort === 'sendAt') {
      sort = 'tam.sendAt';
    } else {
      sort = 'ah.lTime';
    }

    if (listDto.order || listDto.order.trim().length > 0) {
      query.orderBy(sort, listDto.order.toUpperCase() as 'DESC' | 'ASC');
    } else {
      query.orderBy(sort, 'DESC');
    }

    return await query.getMany();
  }

  /**
   * 해당 아이디의 readAt을 업데이트한다.
   *
   * @param id
   * @returns
   */
  async updateReadAtById(id: number) {
    const result = await this.update({ id }, { readAt: new Date() });
    return result.affected;
  }

  /**
   * 아이디로 알림 내용을 가져온다.
   *
   * @param id
   * @returns
   */
  async findById(id: number) {
    const query = this.createQueryBuilder('tam')
      .select([
        'tam.id',
        'ah.alertLevel',
        'ah.alertTitle',
        'ah.alertContent',
        'ah.entranceType',
        'tam.readAt',
        'tam.sendAt',
        'tc.courseID',
        'tc.courseName',
      ])
      .innerJoin('tam.alertHistory', 'ah')
      .innerJoin('ah.course', 'tc')
      .where('tam.id = :id', { id });

    return await query.getOne();
  }

  async removeAll(workerID: number) {
    const result = await this.delete({
      workerID,
    });

    return {
      count: result.affected,
    };
  }

  async removeById(id: number) {
    const result = await this.delete({
      id,
    });

    return {
      count: result.affected,
    };
  }

  /**
   * 해당 아이디가 존재하는 지 여부 확인
   *
   * @param id
   * @returns
   */
  async existsById(id: number) {
    return await this.existsBy({
      id,
    });
  }
}
