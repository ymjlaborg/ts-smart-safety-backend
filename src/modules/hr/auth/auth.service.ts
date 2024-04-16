import { Injectable, Logger } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { ResultDto, UserDto } from 'src/common/dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  async signin(signinDto: SigninDto): Promise<ResultDto<UserDto>> {
    this.logger.log(signinDto.userId);
    return null;
  }

  async refresh() {}

  async deviceToken() {}
}
