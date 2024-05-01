import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';

import { AlertHistoryEntity } from '@app/entities';
import { OnEvent } from '@nestjs/event-emitter';
import { EntranceType, EventName } from '@app/enum';

import { groupBy } from 'lodash';

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
  handleNodedata(value) {
    this.logger.log('Nodedata!!!');

    if (value.length) {
      const newItems = value
        .filter((v) =>
          ['Temperature', 'DustPM10', 'DustPM2p5', 'Humidity'].find((w) =>
            v.nodeName.includes(w),
          ),
        )
        .filter((v) => v.course.entranceType === EntranceType.Entrance);

      this.nodedataSubject.next(groupBy(newItems, 'course.courseID'));
    } else {
      this.nodedataSubject.next([]);
    }
  }

  getNodedataStream() {
    return this.nodedataSubject.asObservable();
  }
}
