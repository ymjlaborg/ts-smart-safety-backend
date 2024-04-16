import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AlertController } from './alert/alert.controller';
import { CommonController } from './common/common.controller';

@Module({
  imports: [],
  controllers: [AuthController, AlertController, CommonController],
  providers: [],
})
export class WorkerModule {}
