import { WorkerAlarmMessageEntity } from '@app/entities';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ListAlertDto } from 'src/apis/worker/alert/dto/list-alert.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkerAlarmMessageRepository extends Repository<WorkerAlarmMessageEntity> {
  private readonly logger: Logger = new Logger(WorkerAlarmMessageEntity.name);

  constructor(
    private dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    super(WorkerAlarmMessageEntity, dataSource.createEntityManager());
  }

  /**
   * 작업자가 가지고 있는 알림의 수
   * @param workerID
   * @param listDto
   * @returns
   */
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

  /**
   * 작업자의 전체 알림 항목을 가져온다.
   *
   * @param workerID
   * @param listDto
   * @returns
   */
  async findAllByWorker(workerID: number, listDto: ListAlertDto) {
    const query = this.createQueryBuilder('tam')
      .select([
        'tam.id',
        'ah.alertLevel',
        'ah.alertType',
        'ah.alertTitle',
        'ah.alertContent',
        'ah.entranceType',
        'ah.lTime',
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

    this.logger.log(`ORDER BY ${sort} / ${listDto.order || 'DESC'}`);

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
        'ah.alertType',
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

  /**
   * 전체 항목을 읽었는지 여부 확인
   *
   * @param workerId
   * @returns
   */
  async readAtByWorkerId(workerId: number) {
    const result = await this.createQueryBuilder('wam')
      .innerJoin('wam.alertHistory', 'a')
      .select('a.alertLevel', 'alertLevel')
      .addSelect('COUNT(wam.readAt) > 0', 'count')
      .where('wam.workerID = :workerId', { workerId })
      .groupBy('a.alertLevel')
      .getRawMany();

    return result;
  }

  /**
   * 재전송 타겟을 가져온다.
   */
  async findByResendTarget() {
    const resendTimer = this.configService.get('notification.resendTimer');
    this.logger.log(`RESEND SECOND TARGET >> ${resendTimer}`);

    const query = this.createQueryBuilder('tam')
      .select([
        'tam.id',
        'ah.alertLevel',
        'ah.alertType',
        'ah.alertTitle',
        'ah.alertContent',
        'ah.entranceType',
        'ah.lTime',
        'tam.readAt',
        'tam.sendAt',
        'tc.courseID',
        'tc.courseName',
        'tam.workerID',
        'worker.mobileToken',
        'worker.watchToken',
      ])
      .innerJoin('tam.alertHistory', 'ah')
      .innerJoin('tam.worker', 'worker')
      .innerJoin('ah.course', 'tc')
      .where('UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(tam.sendAt) >= :time', {
        time: resendTimer,
      })
      .andWhere('tam.readAt IS NULL');

    return await query.getMany();
  }

  /**
   * 전송 데이터를 입력한다.
   */
  async insertWorkerAlarmMessage() {}

  /**
   * 전송한 결과 값을 입력한다.
   */
  async updateResult() {}
}
