import { Module } from '@nestjs/common';
import { AlertController } from './alert/alert.controller';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AuthModule, CommonModule],
  controllers: [AlertController],
  providers: [],
})
export class WorkerModule {}
