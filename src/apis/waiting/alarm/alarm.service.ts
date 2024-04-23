import { EventName } from '@app/enum';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';

@Injectable()
export class AlarmService {
  private readonly logger: Logger = new Logger(AlarmService.name);
  private alarmSubject = new Subject<any>();

  getAlarmStream() {
    return this.alarmSubject.asObservable();
  }

  @OnEvent(EventName.FireAlert)
  handleFireAlarm(event) {
    this.alarmSubject.next(event);
  }
}
