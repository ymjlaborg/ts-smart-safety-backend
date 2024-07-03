import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CameraModule } from './camera/camera.module';
import { AlertModule } from './alert/alert.module';
import { TokenModule } from '../Token/token.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '@app/strategy';
import { CourseModule } from './course/course.module';

@Module({
  imports: [AuthModule, CameraModule, AlertModule, TokenModule, CourseModule],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class WaitingModule {}
