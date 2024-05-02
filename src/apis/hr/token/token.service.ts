import { ListDto } from '@app/dto';
import { TokenServiceName } from '@app/enum';
import { TokenRepository } from '@app/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  /**
   * 작업자의 토큰 정보를 가져온다.
   * @param workerId
   * @returns
   */
  async findAllByWorkerId(workerId: number) {
    return await this.tokenRepository.find({
      where: {
        serviceName: TokenServiceName.Worker,
        targetID: workerId,
      },
    });
  }

  async removeAllWorkerId(workerId: number) {
    await this.tokenRepository.delete({
      serviceName: TokenServiceName.Worker,
      targetID: workerId,
    });
  }

  async findAll(listDto: ListDto) {
    const query = this.tokenRepository
      .createQueryBuilder('token')
      .select('token.targetID', 'targetID')
      .addSelect('token.serviceName', 'serviceName')
      .addSelect(
        'GROUP_CONCAT(CASE WHEN TokenType = 1 THEN token ELSE NULL END) AS accessToken',
      )
      .addSelect(
        'GROUP_CONCAT(CASE WHEN TokenType = 2 THEN token ELSE NULL END) AS refreshToken',
      )
      .groupBy('token.serviceName')
      .addGroupBy('token.targetID');

    const totalCount = await query.getCount();
    const list = await query
      .take(listDto.limit)
      .skip(listDto.offset)
      .orderBy('createdAt', 'DESC')
      .getRawMany();

    console.log(list);

    const totalPage = Math.ceil(totalCount / listDto.limit);

    return {
      list,
      pagination: {
        totalCount,
        totalPage,
        currentPage: listDto.page,
      },
    };
  }

  async removeByServiceNames(serviceName: TokenServiceName, targetID: number) {
    await this.tokenRepository.delete({ serviceName, targetID });
  }
}
