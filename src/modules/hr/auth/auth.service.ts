import { Injectable, Logger } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { ResultDto } from '@app/dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  async signin(signinDto: SigninDto): Promise<ResultDto<any>> {
    this.logger.log(signinDto.userId);
    return null;
  }

  async refresh() {}

  async deviceToken() {}
}
