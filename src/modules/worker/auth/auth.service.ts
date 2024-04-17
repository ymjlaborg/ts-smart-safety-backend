import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { ResultDto } from 'src/common/dto';
import { WorkerDto } from 'src/common/dto/worker.dto';

@Injectable()
export class AuthService {
  async signin(signinDto: SigninDto): Promise<ResultDto<WorkerDto>> {
    return null;
  }

  async refresh() {}

  async deviceToken() {}
}
