import { Module } from '@nestjs/common';
import { WorkerModule } from './worker/worker.module';
import { WaitingModule } from './waiting/waiting.module';
import { HrModule } from './hr/hr.module';
import { HookModule } from './hook/hook.module';
import { ControlModule } from './control/control.module';

@Module({
  imports: [WorkerModule, WaitingModule, HrModule, HookModule, ControlModule],
})
export class ApiModule {}