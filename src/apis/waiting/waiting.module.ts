import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CameraModule } from './camera/camera.module';
import { AlertModule } from './alert/alert.module';
import { TokenModule } from '../Token/token.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '@app/strategy';

@Module({
  imports: [AuthModule, CameraModule, AlertModule, TokenModule],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class WaitingModule {}
