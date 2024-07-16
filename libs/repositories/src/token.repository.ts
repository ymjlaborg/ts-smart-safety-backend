import { TokenEntity } from '@app/entities';
import { TokenServiceName, TokenType } from '@app/enum';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TokenRepository extends Repository<TokenEntity> {
  constructor(private dataSource: DataSource) {
    super(TokenEntity, dataSource.createEntityManager());
  }

  /**
   * 대상 아이디가 존재하는 지 확인
   *
   * @param serviceName
   * @param targetID
   * @returns
   */
  async existsByTarget(
    serviceName: TokenServiceName,
    targetID: number,
  ): Promise<boolean> {
    return await this.existsBy({
      serviceName,
      targetID,
    });
  }

  /**
   *
   * @param serviceName
   * @param targetID
   * @returns
   */
  async findByTarget(
    serviceName: TokenServiceName,
    targetID: number,
    token: string,
    tokenType: TokenType,
  ): Promise<TokenEntity> {
    return await this.findOneBy({
      serviceName,
      targetID,
      token,
      tokenType,
    });
  }

  /**
   *
   * @param serviceName
   * @param targetID
   * @returns
   */
  async countByTarget(
    serviceName: TokenServiceName,
    token: string,
    targetID: number,
  ): Promise<number> {
    return await this.countBy({
      serviceName,
      token,
      targetID,
    });
  }

  /**
   * 해당하는 토큰 아이디를 삭제한다.
   *
   * @param serviceName
   * @param tokenID
   */
  async removeByTarget(
    serviceName: TokenServiceName,
    token: string,
    targetID: number,
  ): Promise<number> {
    const result = await this.delete({
      serviceName,
      token,
      targetID,
    });

    return result.affected;
  }
}
