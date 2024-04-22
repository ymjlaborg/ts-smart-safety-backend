import { CustomException } from '@app/common';
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

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  private readonly logger: Logger = new Logger(JwtAccessStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  /**
   * 검증 성공 시 실행한다.
   * @param payload
   * @returns
   */
  async validate(req: Request) {
    try {
      const accessToken = req.headers['authorization']?.slice(7);

      this.logger.log(`accessToken = ${accessToken || 'NULL'}`);
      this.logger.log(
        `authorization = ${req.headers['authorization'] || 'NULL'}`,
      );

      if (!accessToken) {
        throw new BadRequestException('');
      }

      const secretOrKey = this.configService.get<string>('auth.accessKey');
      const payload = jwt.verify(accessToken, secretOrKey);
      return payload['id'];
    } catch (e) {
      console.log(e);
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
