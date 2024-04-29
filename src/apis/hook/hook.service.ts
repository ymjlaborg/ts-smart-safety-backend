import { Injectable, Logger } from '@nestjs/common';
import { AlertHistoryRepository, DeviceRepository } from '@app/repositories';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AlertType, EventName } from '@app/enum';
import { NodeDataDto } from './dto/node-data.dto';

@Injectable()
export class HookService {
  private readonly logger: Logger = new Logger(HookService.name);

  constructor(
    private readonly alertHistoryRepository: AlertHistoryRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * 노드 데이터를 전달한다.
   * @param nodedatas
   */
  async sendNodedatas(nodedatas: NodeDataDto[]) {
    const deviceStatus =
      await this.deviceRepository.countDevStatusByUserID('TS_Dongtan');

    this.logger.log(`REQUEST NODEDATAS = `, nodedatas);

    this.eventEmitter.emit(EventName.NodeData, {
      nodedatas,
      deviceStatus,
    });
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
