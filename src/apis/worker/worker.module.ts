import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '@app/strategy';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [AuthModule, CommonModule, AlertModule],
  controllers: [],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class WorkerModule {}
