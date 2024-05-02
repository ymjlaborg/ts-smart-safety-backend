import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [RepositoriesModule],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
