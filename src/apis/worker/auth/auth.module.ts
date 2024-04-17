import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WorkerRepository } from './repositories/worker.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, WorkerRepository],
})
export class AuthModule {}
