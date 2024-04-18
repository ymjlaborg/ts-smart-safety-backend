import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SigninDto } from '@app/dto';
import {
  CourseRepository,
  OfficeRepository,
  WorkerRepository,
} from '@app/repositories';
import { CustomException } from '@app/common';
import { TokenService } from 'src/apis/Token/token.service';
import { TokenServiceName } from '@app/enum';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly workerRepository: WorkerRepository,
    private readonly courseRepository: CourseRepository,
    private readonly officeRepository: OfficeRepository,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * 로그인 처리
   *
   * @param signinDto
   * @returns
   */
  async signin(signinDto: SigninDto) {
    const { officeID, workerID, workerPw } = signinDto;

    const existsOffice = await this.officeRepository.existsByOfficeID(officeID);

    if (!existsOffice) {
      throw new CustomException(
        'AUTH_NOT_FOUND_OFFICE',
        HttpStatus.BAD_REQUEST,
      );
    }

    const worker = await this.workerRepository.findByWorkerIDAndOfficeID(
      officeID,
      workerID,
    );

    if (!worker) {
      throw new CustomException('AUTH_NOT_MATCH', HttpStatus.UNAUTHORIZED);
    }

    const isMatched: boolean = await bcrypt.compare(workerPw, worker.workerPw);

    if (!isMatched) {
      throw new CustomException('AUTH_NOT_MATCH', HttpStatus.UNAUTHORIZED);
    }

    delete worker.workerPw;

    const courses = await this.courseRepository.findByOfficeID(officeID);
    worker.office.courses = courses;

    const token = await this.tokenService.createToken({
      serviceName: TokenServiceName.Worker,
      targetID: worker.id,
    });

    worker.token = token;

    return worker;
  }

  async refresh() {}

  async deviceToken() {}
}
