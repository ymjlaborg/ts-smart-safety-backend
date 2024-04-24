import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';

import { AlertHistoryEntity } from '@app/entities';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from '@app/enum';

@Injectable()
export class AlertService {
  private readonly logger: Logger = new Logger(AlertService.name);
  private fireSubject = new Subject<AlertHistoryEntity>();
  private nodedataSubject = new Subject<any>();

  constructor() {}

  @OnEvent(EventName.FireAlert)
  handleFire(alertHistory: AlertHistoryEntity) {
    this.logger.log('FIRE !!!!');
    this.fireSubject.next(alertHistory);
  }

  /**
   * 화재 발생 시 전달
   * @returns
   */
  getFireStream() {
    return this.fireSubject.asObservable();
  }

  @OnEvent(EventName.NodeData)
  handleNodedata() {
    this.logger.log('Nodedata!!!');
    this.nodedataSubject.next({});
  }

  getNodedataStream() {
    return this.nodedataSubject.asObservable();
  }
}
