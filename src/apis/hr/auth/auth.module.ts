import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from 'src/apis/Token/token.module';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [RepositoriesModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
