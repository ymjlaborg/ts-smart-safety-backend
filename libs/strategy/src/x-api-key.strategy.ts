import { CustomException, Utils } from '@app/common';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

@Injectable()
export class XApiKeyStrategy extends PassportStrategy(Strategy, 'xapikey') {
  private readonly logger: Logger = new Logger(XApiKeyStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(req: Request) {
    try {
      const apiKey = req.headers['x-api-key'];

      if (!apiKey) {
        throw new BadRequestException();
      }

      const { xApiKey, xApiSecretKey, xApiIv } = this.configService.get('auth');
      const key = Utils.decryptAES(xApiKey, xApiSecretKey, xApiIv);
      const isMatch = await Utils.bcryptCompare(key, apiKey as string);

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      return isMatch;
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw new CustomException('AUTH_UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      } else {
        throw new CustomException('AUTH_BAD_API_KEY', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
