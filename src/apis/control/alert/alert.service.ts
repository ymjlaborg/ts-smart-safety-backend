import { EventName } from '@app/enum';
import { AlertHistoryRepository } from '@app/repositories';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';
import { ListAlertDto } from './dto/list-alert.dto';

@Injectable()
export class AlertService {
  private readonly logger: Logger = new Logger(AlertService.name);
  private alarmSubject = new Subject<any>();

  constructor(
    private readonly alertHistoryRepository: AlertHistoryRepository,
  ) {}

  @OnEvent(EventName.ControlAlarm)
  handleAlarm(event) {
    this.alarmSubject.next(event);
  }

  /**
   * 알림 목록을 가져온다.
   * @param query
   */
  async find(id: number, query: ListAlertDto) {
    return await this.alertHistoryRepository.findAll(id, query);
  }
}
