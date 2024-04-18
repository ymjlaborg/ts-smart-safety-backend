import { WorkerEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateWorkerDto } from '@app/dto';
import { WorkerStatus } from '@app/enum';

@Injectable()
export class WorkerRepository extends Repository<WorkerEntity> {
  constructor(private dataSource: DataSource) {
    super(WorkerEntity, dataSource.createEntityManager());
  }

  /**
   * 해당 아이디가 존재하는지 확인
   * @param workerID
   * @returns
   */
  async existsByWorkerID(workerID: string): Promise<boolean> {
    return await this.existsBy({
      workerID,
    });
  }

  /**
   * 검사소 아이디와 작업자 아이디로 정보를 가져온다.
   *
   * @param officeID
   * @param workerID
   * @returns
   */
  async findByWorkerIDAndOfficeID(
    officeID: number,
    workerID: string,
  ): Promise<WorkerEntity> {
    const query = this.createQueryBuilder('worker')
      .select([
        'worker.id',
        'worker.workerID',
        'worker.workerPw',
        'worker.workerName',
        'worker.deviceToken',
        'worker.expireAt',
        'office.officeID',
        'office.officeName',
      ])
      .innerJoin('worker.office', 'office')
      .where('worker.officeID = :officeID', { officeID })
      .andWhere('worker.workerID = :workerID', { workerID })
      .andWhere('worker.workerStatus = :workerStatus', {
        workerStatus: WorkerStatus.Use,
      });

    return await query.getOne();
  }

  /**
   * 해당 아이디를 생성한다.
   *
   * @param createWorkerDto
   */
  async createWorker(createWorkerDto: CreateWorkerDto) {
    const result = await this.save({
      ...createWorkerDto,
    });

    return {
      id: result.id,
    };
  }

  /**
   * 디바이스 토큰 업데이트
   * @param deviceToken
   */
  async updateDeviceToken(id: number, deviceToken: string, expireAt: Date) {
    await this.update({ id }, { deviceToken, expireAt, updatedAt: new Date() });
  }
}
