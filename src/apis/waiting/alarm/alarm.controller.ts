import { Controller, Param, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, interval, map } from 'rxjs';
import { AlarmService } from './alarm.service';

@ApiTags('대기실')
@Controller('waiting/alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Sse('courses/:id')
  course(@Param('id') id: number): Observable<MessageEvent> {
    return this.alarmService.getAlarmStream().pipe(
      map((alarm) => ({
        data: JSON.stringify(alarm),
      })),
    );
  }

  @Sse('fire')
  fire() {}
}
