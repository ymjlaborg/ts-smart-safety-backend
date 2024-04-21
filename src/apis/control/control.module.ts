import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CameraModule } from './camera/camera.module';
@Module({
  imports: [AuthModule, CameraModule],
})
export class ControlModule {}
