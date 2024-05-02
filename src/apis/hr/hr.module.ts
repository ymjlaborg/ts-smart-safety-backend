import { Module } from '@nestjs/common';
import { WorkerModule } from './worker/worker.module';
import { AuthModule } from './auth/auth.module';
import { OfficeModule } from './office/office.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [WorkerModule, AuthModule, OfficeModule, TokenModule],
})
export class HrModule {}
