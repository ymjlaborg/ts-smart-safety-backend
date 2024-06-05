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
      const weather = value
        .filter((v) =>
          [
            'Temperature', // 온도
            'Humidity', // 습도
            'DustPM10', // 미세먼지
            'DustPM2p5', // 초미세먼지
          ].find((w) => v.nodeName.includes(w)),
        )
        .filter((v) => v.course.entranceType === EntranceType.Entrance);

      const gas = value
        .filter((v) =>
          [
            'CO', // 일산화탄소
            'CO2', // 이산화탄소
            'NO', // 일산화질소
            'NO2', // 이산화질소
            'CH4', // 메탄
            'H2S', // 황화수소
          ].find((w) => v.nodeName.includes(w)),
        )
        .filter(
          (v) =>
            v.course.entranceType !== EntranceType.Entrance &&
            v.course.entranceType !== EntranceType.Exit,
        );

      this.nodedataSubject.next(
        groupBy([...weather, ...gas], 'course.courseID'),
      );
    } else {
      this.nodedataSubject.next([]);
    }
  }

  getNodedataStream() {
    return this.nodedataSubject.asObservable();
  }
}
