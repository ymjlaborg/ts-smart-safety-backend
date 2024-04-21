import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';

@Injectable()
export class AlarmService {
  private alarmSubject = new Subject<any>();

  getAlarmStream() {
    return this.alarmSubject.asObservable();
  }

  @OnEvent('alarm.data')
  handleAlarmData(event: any) {
    console.log(event);
    this.alarmSubject.next(event);
  }
}
