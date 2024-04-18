import { TokenEntity } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TokenRepository extends Repository<TokenEntity> {
  constructor(private dataSource: DataSource) {
    super(TokenEntity, dataSource.createEntityManager());
  }
}
