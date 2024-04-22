import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CameraModule } from './camera/camera.module';
import { AlertModule } from './alert/alert.module';
@Module({
  imports: [AuthModule, CameraModule, AlertModule],
})
export class ControlModule {}
