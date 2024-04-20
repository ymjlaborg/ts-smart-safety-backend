import { HttpStatus, Injectable } from '@nestjs/common';
import { WorkerAlarmMessageRepository } from '@app/repositories';
import { ListAlertDto } from './dto/list-alert.dto';
import { CustomException } from '@app/common';

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
    const list = (
      await this.workerAlarmMessageRepository.findAllByWorker(id, listDto)
    ).map((value) => {
      const alertHistory = value.alertHistory;
      return {
        ...alertHistory,
        id: value.id,
        readAt: value.readAt,
        sendAt: value.sendAt,
      };
    });

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

  /**
   * 아이디로 상세정보를 가져온다.
   * @param id
   * @returns
   */
  async findById(id: number) {
    const exists = await this.workerAlarmMessageRepository.existsById(id);

    if (!exists) {
      throw new CustomException('COURSE_NO', HttpStatus.BAD_REQUEST);
    }

    await this.workerAlarmMessageRepository.updateReadAtById(id);

    const data = await this.workerAlarmMessageRepository.findById(id);

    return {
      id: data.id,
      readAt: data.readAt,
      sendAt: data.sendAt,
      ...data.alertHistory,
    };
  }

  /**
   * 작업자 아이디가 가지고 있는 모든 정보를 삭제한다.
   *
   * @param workerID
   * @returns
   */
  async removeAll(workerID: number) {
    return await this.workerAlarmMessageRepository.removeAll(workerID);
  }

  /**
   *
   *
   * @param id
   */
  async removeById(id: number) {
    const exists = await this.workerAlarmMessageRepository.existsById(id);

    if (!exists) {
      throw new CustomException('COURSE_NO', HttpStatus.BAD_REQUEST);
    }

    return await this.workerAlarmMessageRepository.removeById(id);
  }
}
