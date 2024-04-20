import { Module } from '@nestjs/common';
import { OfficeRepository } from './office.repository';
import { WorkerRepository } from './worker.repository';
import { CourseRepository } from './course.repository';
import { TokenRepository } from './token.repository';
import { WorkerAlarmMessageRepository } from './worker-alarm-message.repository';
import { NodedataRepository } from './nodedata.repository';

@Module({
  providers: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
    WorkerAlarmMessageRepository,
    NodedataRepository,
  ],
  exports: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
    WorkerAlarmMessageRepository,
    NodedataRepository,
  ],
})
export class RepositoriesModule {}
