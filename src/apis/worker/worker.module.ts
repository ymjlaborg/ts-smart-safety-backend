import { Module } from '@nestjs/common';
import { AlertController } from './alert/alert.controller';
import { CommonController } from './common/common.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AlertController, CommonController],
  providers: [],
})
export class WorkerModule {}
