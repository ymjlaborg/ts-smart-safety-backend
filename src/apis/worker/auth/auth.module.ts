import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  CourseRepository,
  OfficeRepository,
  TokenRepository,
  WorkerRepository,
} from '@app/repositories';
import { TokenModule } from 'src/apis/Token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    WorkerRepository,
    TokenRepository,
    CourseRepository,
    OfficeRepository,
  ],
})
export class AuthModule {}
