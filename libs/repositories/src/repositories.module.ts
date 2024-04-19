import { Module } from '@nestjs/common';
import { OfficeRepository } from './office.repository';
import { WorkerRepository } from './worker.repository';
import { CourseRepository } from './course.repository';
import { TokenRepository } from './token.repository';
import { WorkerAlarmMessageRepository } from './worker-alarm-message.repository';

@Module({
  providers: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
    WorkerAlarmMessageRepository,
  ],
  exports: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
    WorkerAlarmMessageRepository,
  ],
})
export class RepositoriesModule {}
