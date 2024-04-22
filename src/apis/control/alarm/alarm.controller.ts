import { Controller, Get } from '@nestjs/common';
import { AlarmService } from './alarm.service';

@Controller('control/alarms')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Get()
  alarms() {}
}
