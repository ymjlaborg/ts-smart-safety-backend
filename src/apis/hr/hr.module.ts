import { Module } from '@nestjs/common';
import { WorkerController } from './worker/worker.controller';
import { WorkerService } from './worker/worker.service';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class HrModule {}
