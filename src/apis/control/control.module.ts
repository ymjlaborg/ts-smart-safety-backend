import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '@app/strategy';
import { TokenModule } from '../Token/token.module';
@Module({
  imports: [AuthModule, CommonModule, TokenModule],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class ControlModule {}
