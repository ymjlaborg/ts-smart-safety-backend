import { Controller, HttpStatus, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { AlarmService } from './alarm.service';

interface AlarmEvent {
  data: string;
  status: number;
}

@ApiTags('대기실')
@Controller('waiting/alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Sse()
  alarm(): Observable<AlarmEvent> {
    return this.alarmService.getAlarmStream().pipe(
      map((alarm) => ({
        data: JSON.stringify(alarm),
        status: HttpStatus.OK,
      })),
    );
  }
}
