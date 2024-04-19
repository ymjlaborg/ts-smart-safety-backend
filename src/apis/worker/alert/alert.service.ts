import { Injectable } from '@nestjs/common';
import { WorkerAlarmMessageRepository } from '@app/repositories';
import { ListAlertDto } from './dto/list-alert.dto';

@Injectable()
export class AlertService {
  constructor(
    private readonly workerAlarmMessageRepository: WorkerAlarmMessageRepository,
  ) {}

  /**
   *
   * @param id
   * @returns
   */
  async find(id: number, listDto: ListAlertDto) {
    const totalCount: number =
      await this.workerAlarmMessageRepository.countAllByWorker(id, listDto);
    const list = await this.workerAlarmMessageRepository.findAllByWorker(
      id,
      listDto,
    );

    const totalPage: number = Math.ceil(totalCount / listDto.limit);

    return {
      list,
      pagination: {
        totalCount,
        totalPage,
        currentPage: listDto.page,
      },
    };
  }
}
