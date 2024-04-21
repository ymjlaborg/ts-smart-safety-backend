import { Injectable } from '@nestjs/common';
import { AlertHistoryRepository } from '@app/repositories';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class HookService {
  constructor(
    private readonly alertHistoryRepository: AlertHistoryRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async saveNodedata(nodedata: any) {}

  async sendAlarm(alarmId: number) {
    console.log('ABC', alarmId);
    const result = await this.alertHistoryRepository.findOne({
      where: {
        id: alarmId,
      },
    });

    console.log('ABC');

    if (result) {
      this.eventEmitter.emit('alarm.data', result);
    }
  }
}
