import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RepositoriesModule } from '@app/repositories';
import { TokenModule } from 'src/apis/Token/token.module';

@Module({
  imports: [RepositoriesModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
