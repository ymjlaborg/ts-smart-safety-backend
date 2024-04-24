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
import { TokenService } from 'src/apis/Token/token.service';
import { TokenServiceName, TokenType } from '@app/enum';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  private readonly logger: Logger = new Logger(JwtAccessStrategy.name);

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
      const accessToken = req.headers['authorization']?.slice(7);

      this.logger.log(`accessToken = ${accessToken || 'NULL'}`);
      this.logger.log(
        `authorization = ${req.headers['authorization'] || 'NULL'}`,
      );
      this.logger.log(req.url);

      if (!accessToken) {
        throw new BadRequestException('');
      }

      const secretOrKey = this.configService.get<string>('auth.accessKey');
      const payload = jwt.verify(accessToken, secretOrKey);
      const id = payload['id'];
      const serviceName = req.url.slice(1).split('/')[2];

      const result = await this.tokenService.findByTarget(
        serviceName as TokenServiceName,
        id,
        TokenType.Access,
      );

      if (!result.data) {
        this.logger.error('Not Found Token From DB!!');
        throw new BadRequestException();
      }

      console.log('ASDADS', id);

      return payload['id'];
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
