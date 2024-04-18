import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SigninDto } from '@app/dto';
import {
  CourseRepository,
  TokenRepository,
  WorkerRepository,
} from '@app/repositories';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly workerRepository: WorkerRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  /**
   * 로그인 처리
   *
   * @param signinDto
   * @returns
   */
  async signin(signinDto: SigninDto) {
    const { officeID, workerID, workerPw } = signinDto;
    const worker = await this.workerRepository.findByWorkerIDAndOfficeID(
      officeID,
      workerID,
    );

    if (!worker) {
      return;
    }

    const isMatched: boolean = await bcrypt.compare(workerPw, worker.workerPw);

    if (!isMatched) {
      return;
    }

    const courses = await this.courseRepository.findByOfficeID(officeID);

    delete worker.workerPw;

    worker.office.courses = courses;
    return worker;
  }

  async refresh() {}

  async deviceToken() {}
}
