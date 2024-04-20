import { NodedataEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class NodedataRepository extends Repository<NodedataEntity> {
  constructor(private dataSource: DataSource) {
    super(NodedataEntity, dataSource.createEntityManager());
  }
}
