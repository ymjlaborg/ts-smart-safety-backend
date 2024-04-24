import { WorkerEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
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
   * 동일한 디바이스 토큰이 존재하는지 확인
   *
   * @param deviceToken
   * @returns
   */
  async existsByMobileToken(mobileToken: string): Promise<boolean> {
    return await this.existsBy({
      mobileToken,
    });
  }

  /**
   * 동일한 디바이스 토큰이 존재하는지 확인
   *
   * @param deviceToken
   * @returns
   */
  async existsByWatchToken(watchToken: string): Promise<boolean> {
    return await this.existsBy({
      watchToken,
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
  ): Promise<any> {
    const query = this.createQueryBuilder('worker')
      .select([
        'worker.id',
        'worker.workerID',
        'worker.workerPw',
        'worker.workerName',
        'worker.mobileToken',
        'worker.watchToken',
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
   * 대상 작업자의 워치 토큰 업데이트
   *
   * @param id
   * @param watchToken
   * @param expireAt
   */
  async updateWatchToken(id: number, watchToken: string, expireAt: Date) {
    await this.update({ id }, { watchToken, expireAt, updatedAt: new Date() });
  }

  /**
   * 대상 작업자의 모바일 토큰 업데이트
   *
   * @param id
   * @param mobileToken
   * @param expireAt
   */
  async updateMobileToken(id: number, mobileToken: string, expireAt: Date) {
    await this.update({ id }, { mobileToken, expireAt, updatedAt: new Date() });
  }

  /**
   *  작업 진로 아이디로 작업자를 가져온다.
   *
   * @param courseID
   */
  async findAllCourseID(courseID: number) {
    return await this.findBy({
      courses: {
        courseID,
      },
      workerStatus: WorkerStatus.Use,
      mobileToken: Not(IsNull()),
      watchToken: Not(IsNull()),
    });
  }
}
