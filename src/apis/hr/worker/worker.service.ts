import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateWorkerDto, ListDto } from '@app/dto';
import { OfficeRepository, WorkerRepository } from '@app/repositories';
import { Not } from 'typeorm';
import { WorkerStatus } from '@app/enum';

@Injectable()
export class WorkerService {
  private readonly logger: Logger = new Logger(WorkerService.name);

  constructor(
    private configService: ConfigService,
    private readonly workerRepository: WorkerRepository,
    private readonly officeRepository: OfficeRepository,
  ) {}

  /**
   * 목록을 가져온다.
   *
   * @param listDto
   * @returns
   */
  async find(listDto: ListDto) {
    const totalCount = await this.workerRepository.count({
      where: {
        workerStatus: Not(WorkerStatus.Deleted),
      },
    });
    const list = await this.workerRepository.find({
      where: {
        workerStatus: Not(WorkerStatus.Deleted),
      },
      relations: ['office'],
      take: listDto.limit,
      skip: listDto.offset,
    });

    const totalPage = Math.ceil(totalCount / listDto.limit);

    return {
      list,
      pagination: {
        totalCount,
        totalPage,
        currentPage: listDto.page,
      },
    };
  }

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
