import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  CourseRepository,
  TokenRepository,
  WorkerRepository,
} from '@app/repositories';

@Module({
  controllers: [AuthController],
  providers: [AuthService, WorkerRepository, TokenRepository, CourseRepository],
})
export class AuthModule {}
