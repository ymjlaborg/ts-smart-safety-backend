import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AlertController } from './alert/alert.controller';
import { CommonController } from './common/common.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AuthController, AlertController, CommonController],
  providers: [AuthService],
})
export class WorkerModule {}
