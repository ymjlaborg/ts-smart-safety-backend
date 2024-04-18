import { CreateTokenDto } from '@app/dto/token';
import { OfficeEntity, WorkerEntity } from '@app/entities';
import { TokenServiceName } from '@app/enum';
import { TokenRepository } from '@app/repositories';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  /**
   * 토큰 생성
   *
   * @param createTokenDto
   */
  async createToken(createTokenDto: CreateTokenDto) {}

  private async createAccessToken(
    createTokenDto: CreateTokenDto,
  ): Promise<string> {
    const { targetID } = createTokenDto;
    const { accessKey, accessExpiresIn } = this.configService.get('auth');
    const accessToken = await this.jwtService.sign(
      { id: targetID },
      {
        secret: accessKey,
        expiresIn: accessExpiresIn,
      },
    );

    return accessToken;
  }

  private async createRefreshToken(targetID: number): Promise<string> {
    const { refreshKey, refreshExpiresIn } = this.configService.get('auth');

    return await this.jwtService.sign(
      { id: targetID },
      {
        secret: refreshKey,
        expiresIn: refreshExpiresIn,
      },
    );
  }
}
