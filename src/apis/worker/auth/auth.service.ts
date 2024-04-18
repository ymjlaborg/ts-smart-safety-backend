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
import { TokenDto } from '@app/dto/token';
import * as dayjs from 'dayjs';

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

  /**
   * 기존 아이디는 삭제하고 신규 아이디를 작성한다.
   *
   * @param refreshToken
   * @param id
   */
  async refresh(id: number): Promise<TokenDto> {
    const token = await this.tokenService.createToken({
      serviceName: TokenServiceName.Worker,
      targetID: id,
    });

    return token;
  }

  /**
   * 디바이스 토큰을 업데이트 한다.
   *
   * @param id
   * @param deviceToken
   */
  async deviceToken(id: number, deviceToken: string) {
    const existsDeviceToken =
      await this.workerRepository.existsByDeviceToken(deviceToken);

    if (existsDeviceToken) {
      throw new CustomException(
        'DEVICE_TOKEN_DUPLICATED',
        HttpStatus.BAD_REQUEST,
      );
    }

    const expireAt: Date = dayjs(new Date()).add(3, 'month').toDate();

    await this.workerRepository.updateDeviceToken(id, deviceToken, expireAt);

    return {
      workerID: id,
      deviceToken,
      expireAt,
    };
  }
}
