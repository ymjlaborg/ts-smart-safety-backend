import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import * as jwt from 'jsonwebtoken';
import { CustomException } from '@app/common';
import { TokenService } from 'src/apis/Token/token.service';
import { TokenServiceName, TokenType } from '@app/enum';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  private readonly logger: Logger = new Logger(JwtRefreshStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private tokenService: TokenService,
  ) {
    super();
  }

  /**
   * 검증 성공 시 실행한다.
   * @param payload
   * @returns
   */
  async validate(req: Request) {
    try {
      const refreshToken = req.headers['authorization']?.slice(7);

      if (!refreshToken) {
        throw new BadRequestException('');
      }

      const secretOrKey = this.configService.get<string>('auth.refreshKey');
      const payload = jwt.verify(refreshToken, secretOrKey);
      const id = payload['id'];
      const serviceName = req.url.slice(1).split('/')[2];

      const result = await this.tokenService.findByTarget(
        serviceName as TokenServiceName,
        id,
        refreshToken,
        TokenType.Refresh,
      );

      if (!result.data) {
        this.logger.error('Not Found Token From DB!!');
        throw new BadRequestException();
      }

      return {
        id,
        refreshToken,
      };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new CustomException(
          'AUTH_NO_ACCESS_TOKEN',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (e instanceof SyntaxError) {
        // JSON Object 에러
        throw new CustomException(
          'AUTH_NO_ACCESS_TOKEN',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (e instanceof jwt.TokenExpiredError) {
        throw new CustomException(
          'AUTH_EXPIRED_ACCESS_TOKEN',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (e instanceof jwt.JsonWebTokenError) {
        throw new CustomException(
          'AUTH_NO_ACCESS_TOKEN',
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new CustomException(
          'AUTH_EXPIRED_ACCESS_TOKEN',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
