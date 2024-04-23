import { Injectable } from '@nestjs/common';
import { AlertHistoryRepository, NodeRepository } from '@app/repositories';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AlertType, EventName } from '@app/enum';

@Injectable()
export class HookService {
  constructor(
    private readonly alertHistoryRepository: AlertHistoryRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async saveNodedata(nodedata: any) {
    // TODO 1. Redis에 연결하여 데이터 저장
    // 2. this.eventEmitter로 데이터 전달
    // 3. this.eventEmitter로 전달 받은 데이터도 전달.
  }

  /**
   * 알림 전달
   * @param alertId
   */
  async sendAlert(alertId: number) {
    const result = await this.alertHistoryRepository.findById(alertId);

    if (result) {
      if (result.alertType === AlertType.Fire) {
        this.eventEmitter.emit(EventName.FireAlert, result);
      }

      this.eventEmitter.emit(EventName.ControlAlert, result);
      this.eventEmitter.emit(EventName.WorkerPush, result);
    }
  }
}
