import { Module } from '@nestjs/common';
import { AlertController } from './alert/alert.controller';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '@app/strategy';

@Module({
  imports: [AuthModule, CommonModule],
  controllers: [AlertController],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class WorkerModule {}
