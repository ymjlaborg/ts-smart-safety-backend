import { AlertHistoryEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AlertHistoryRepository extends Repository<AlertHistoryEntity> {
  constructor(private dataSource: DataSource) {
    super(AlertHistoryEntity, dataSource.createEntityManager());
  }
}
