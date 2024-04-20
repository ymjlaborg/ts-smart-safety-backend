import { CreateTokenDto, TokenDto } from '@app/dto/token';
import { TokenServiceName, TokenType } from '@app/enum';
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
  async createToken(createTokenDto: CreateTokenDto): Promise<TokenDto> {
    // 기존 토큰이 있는지 확인 후 삭제 (전체 삭제한다)
    const { serviceName, targetID } = createTokenDto;
    const count = await this.tokenRepository.countByTarget(
      serviceName,
      targetID,
    );

    if (count > 0) {
      await this.tokenRepository.removeByTarget(serviceName, targetID);
    }

    const accessToken = await this.createAccessToken(createTokenDto);

    if (serviceName === TokenServiceName.Worker) {
      return {
        accessToken,
      };
    }

    const refreshToken = await this.createRefreshToken(createTokenDto);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * 접근 토큰을 생성하여 전달한다.
   *
   * @param createTokenDto
   * @returns
   */
  private async createAccessToken(
    createTokenDto: CreateTokenDto,
  ): Promise<string> {
    const { serviceName, targetID } = createTokenDto;
    const { accessKey, accessExpiresIn, mobileAccessExpiresIn } =
      this.configService.get('auth');

    const expiresIn =
      serviceName === TokenServiceName.Worker
        ? mobileAccessExpiresIn
        : accessExpiresIn;

    const accessToken = await this.jwtService.sign(
      { id: targetID },
      {
        secret: accessKey,
        expiresIn,
      },
    );

    const expireAt = this.getTokenExpirationTime(accessToken);

    console.log('CREATED!!', expireAt);
    await this.tokenRepository.save({
      serviceName,
      targetID,
      token: accessToken,
      tokenType: TokenType.Access,
      expireAt,
      createdAt: new Date(),
    });

    return accessToken;
  }

  /**
   * 응답 토큰을 생성하여 전달한다.
   *
   * @param createTokenDto
   * @returns
   */
  private async createRefreshToken(
    createTokenDto: CreateTokenDto,
  ): Promise<string> {
    const { serviceName, targetID } = createTokenDto;
    const { refreshKey, refreshExpiresIn } = this.configService.get('auth');
    const refreshToken = await this.jwtService.sign(
      { id: targetID },
      {
        secret: refreshKey,
        expiresIn: refreshExpiresIn,
      },
    );

    const expireAt = this.getTokenExpirationTime(refreshToken);

    await this.tokenRepository.save({
      serviceName,
      targetID,
      tokenType: TokenType.Refresh,
      token: refreshToken,
      expireAt,
      createdAt: new Date(),
    });

    return refreshToken;
  }

  /**
   * 토큰의 종료 시간을 가져온다.
   *
   * @param token
   * @returns
   */
  private getTokenExpirationTime(token: string): Date | null {
    try {
      const decodedToken = this.jwtService.decode(token);

      if (
        decodedToken &&
        typeof decodedToken === 'object' &&
        'exp' in decodedToken
      ) {
        const expirationTime = decodedToken.exp;
        return new Date(expirationTime * 1000);
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
