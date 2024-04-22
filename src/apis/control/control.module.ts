import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CameraModule } from './camera/camera.module';
import { AlarmModule } from './alarm/alarm.module';
@Module({
  imports: [AuthModule, CameraModule, AlarmModule],
})
export class ControlModule {}
