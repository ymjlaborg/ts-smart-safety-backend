import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateWorkerDto } from '@app/dto';
import { OfficeRepository, WorkerRepository } from '@app/repositories';

@Injectable()
export class WorkerService {
  private readonly logger: Logger = new Logger(WorkerService.name);

  constructor(
    private configService: ConfigService,
    private readonly workerRepository: WorkerRepository,
    private readonly officeRepository: OfficeRepository,
  ) {}

  /**
   * 관리자 정보
   *
   * @param createWorkerDto
   * @returns
   */
  async create(createWorkerDto: CreateWorkerDto) {
    const { officeID, workerID, workerPw } = createWorkerDto;

    const existsOffice = await this.officeRepository.existsByOfficeID(officeID);

    if (!existsOffice) {
      this.logger.log(`not exist office id = ${officeID}`);
      return;
    }

    const existWorkerID: boolean =
      await this.workerRepository.existsByWorkerID(workerID);

    if (existWorkerID) {
      this.logger.log(`duplicate worker id = ${workerID}`);
      return;
    }

    const saltOrRounds = this.configService.get<number>('auth.saltOrRounds');
    const newPw = await bcrypt.hash(workerPw, Number(saltOrRounds));

    createWorkerDto.workerPw = newPw;

    const result = await this.workerRepository.createWorker(createWorkerDto);
    return result;
  }
}
