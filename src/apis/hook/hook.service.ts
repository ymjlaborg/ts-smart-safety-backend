import { Injectable } from '@nestjs/common';
import { AlertHistoryRepository, NodeRepository } from '@app/repositories';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
   * @param alarmId
   */
  async sendAlarm(alarmId: number) {
    const result = await this.alertHistoryRepository.findById(alarmId);

    if (result) {
      this.eventEmitter.emit('alarm.data', result);
    }
  }
}
