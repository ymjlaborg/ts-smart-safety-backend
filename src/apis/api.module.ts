import { Module } from '@nestjs/common';
import { WorkerModule } from './worker/worker.module';
import { WaitingModule } from './waiting/waiting.module';
import { HrModule } from './hr/hr.module';
import { HookModule } from './hook/hook.module';
import { ControlModule } from './control/control.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    WorkerModule,
    WaitingModule,
    HrModule,
    HookModule,
    ControlModule,
    NotificationModule,
  ],
})
export class ApiModule {}
