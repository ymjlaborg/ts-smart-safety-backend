import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenRepository } from '@app/repositories';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
