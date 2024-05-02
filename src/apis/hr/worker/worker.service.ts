import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateWorkerDto, ListDto, UpdateWorkerDto } from '@app/dto';
import {
  CourseRepository,
  OfficeRepository,
  WorkerRepository,
} from '@app/repositories';
import { In, Not } from 'typeorm';
import { WorkerStatus } from '@app/enum';
import { CustomException } from '@app/common';

@Injectable()
export class WorkerService {
  private readonly logger: Logger = new Logger(WorkerService.name);

  constructor(
    private configService: ConfigService,
    private readonly workerRepository: WorkerRepository,
    private readonly officeRepository: OfficeRepository,
    private readonly courseRepository: CourseRepository,
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
      order: {
        createdAt: 'DESC',
      },
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
    console.log(createWorkerDto);
    const { officeID, workerID, workerPw } = createWorkerDto;
    const existsOffice = await this.officeRepository.existsByOfficeID(officeID);
    if (!existsOffice) {
      throw new CustomException(
        'AUTH_NOT_FOUND_OFFICE',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existWorkerID: boolean =
      await this.workerRepository.existsByWorkerID(workerID);
    if (existWorkerID) {
      throw new CustomException(
        'AUTH_DUPLICATE_WORKER',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = this.configService.get<number>('auth.saltOrRounds');
    const newPw = await bcrypt.hash(workerPw, Number(saltOrRounds));
    createWorkerDto.workerPw = newPw;
    const result = await this.workerRepository.createWorker(createWorkerDto);

    const worker = await this.workerRepository.findOne({
      where: {
        id: result.id,
      },
      relations: ['courses'],
    });

    const courses = await this.courseRepository.findBy({
      courseID: In(createWorkerDto.courses),
    });

    worker.courses = courses;

    await this.workerRepository.save(worker);

    return result;
  }

  /**
   *
   * @param id
   */
  async findById(id: number) {
    return await this.workerRepository.findOne({
      relations: ['courses', 'office'],
      where: {
        id,
      },
    });
  }

  async updateById(id: number, data: UpdateWorkerDto) {
    const worker = await this.workerRepository.findOne({
      where: {
        id,
      },
      relations: ['courses'],
    });
    const courses = await this.courseRepository.findBy({
      courseID: In(data.courses),
    });

    worker.courses = courses;
    worker.workerName = data.workerName;

    return await this.workerRepository.save(worker);
  }

  /**
   * 작업자를 삭제한다.
   *
   * @param workerId
   */
  async removeById(workerId: number) {
    await this.workerRepository.update(
      { id: workerId },
      {
        workerStatus: WorkerStatus.Deleted,
      },
    );
  }
}
