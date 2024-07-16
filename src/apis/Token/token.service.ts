import { CreateTokenDto, TokenDto } from '@app/dto/token';
import { TokenServiceName, TokenType } from '@app/enum';
import { TokenRepository } from '@app/repositories';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private logger: Logger = new Logger(TokenService.name);

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
    const { serviceName } = createTokenDto;

    // 기존 토큰이 있는지 확인 후 삭제 (전체 삭제한다)
    // 중복 로그인이 가능하게 한다.
    // console.log(serviceName, targetID);

    // const count = await this.tokenRepository.countByTarget(
    //   serviceName,
    //   targetID,
    // );

    // if (count > 0) {
    //   await this.tokenRepository.removeByTarget(serviceName, targetID);
    // }

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
   * 대상 토큰 삭제
   *
   * @param serviceName
   * @param targetID
   * @returns
   */
  async removeByTarget(
    serviceName: TokenServiceName,
    token: string,
    targetID: number,
  ) {
    const count = await this.tokenRepository.countByTarget(
      serviceName,
      token,
      targetID,
    );

    if (count > 0) {
      await this.tokenRepository.removeByTarget(serviceName, token, targetID);
    }

    return {
      count,
    };
  }

  async findByTarget(
    serviceName: TokenServiceName,
    targetID: number,
    token: string,
    tokenType: TokenType,
  ) {
    const data = await this.tokenRepository.findByTarget(
      serviceName,
      targetID,
      token,
      tokenType,
    );

    return {
      data,
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

    this.logger.log(`CREATED ACCESS TOKEN >> ${accessToken}`);

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
   * 갱신 토큰을 생성하여 전달한다.
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

    this.logger.log(`CREATED REFRESH TOKEN >> ${refreshToken}`);

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
