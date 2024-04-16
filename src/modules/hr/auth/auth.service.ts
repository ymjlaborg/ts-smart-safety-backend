import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { ResultDto } from 'src/common/dto';

@Injectable()
export class AuthService {
  async signin(signinDto: SigninDto): Promise<ResultDto<any>> {
    return null;
  }

  async refresh() {}

  async deviceToken() {}
}
