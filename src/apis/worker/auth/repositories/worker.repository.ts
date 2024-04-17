import { DataSource, Repository } from 'typeorm';
import { Worker } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { SigninDto } from '../dto/signin.dto';
import { WorkerStatus, Yn } from '@app/enum';

@Injectable()
export class WorkerRepository extends Repository<Worker> {
  constructor(private dataSource: DataSource) {
    super(Worker, dataSource.createEntityManager());
  }

  async findById(signinDto: SigninDto) {
    const { workerID, officeID } = signinDto;

    const query = this.createQueryBuilder('w')
      .select([
        'w.workerID',
        'w.workerPw',
        'w.workerName',
        'w.workerStatus',
        'w.deviceToken',
        'w.expireAt',
        'o.username',
        'e.officeID',
      ])
      .innerJoin('e.officeID', 'o')
      .where('w.workerID = :workerID and w.officeID = :officeID', {
        workerID,
        officeID,
      })
      .andWhere('w.workerStatus = :workerStatus', {
        workerStats: WorkerStatus.Use,
      })
      .andWhere('w.delYn = :delYn', { delYn: Yn.N });

    return await query.getOne();
  }
}
