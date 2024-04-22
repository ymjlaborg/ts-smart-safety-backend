import { NodeEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class NodeRepository extends Repository<NodeEntity> {
  constructor(private dataSource: DataSource) {
    super(NodeEntity, dataSource.createEntityManager());
  }
}
