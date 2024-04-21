import { Module } from '@nestjs/common';
import { WorkerModule } from './worker/worker.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WorkerModule, AuthModule],
})
export class HrModule {}
