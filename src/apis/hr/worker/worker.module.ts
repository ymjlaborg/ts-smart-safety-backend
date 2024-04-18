import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { OfficeRepository, WorkerRepository } from '@app/repositories';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService, OfficeRepository, WorkerRepository],
})
export class WorkerModule {}
