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

    query.limit(listDto.limit);
    query.take(listDto.offset);

    let sort: string;

    if (listDto.sort === 'level') {
      sort = 'ah.alertLevel';
    } else if (listDto.sort === 'readAt') {
      sort = 'tam.readAt';
    } else if (listDto.sort === 'sendAt') {
      sort = 'tam.sendAt';
    }

    query.orderBy(sort, listDto.order.toUpperCase() as 'DESC' | 'ASC');

    return await query.getMany();
  }
}
