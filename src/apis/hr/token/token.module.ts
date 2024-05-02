import { RepositoriesModule } from '@app/repositories';
import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
