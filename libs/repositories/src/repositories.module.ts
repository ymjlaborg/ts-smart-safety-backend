import { Module } from '@nestjs/common';
import { OfficeRepository } from './office.repository';
import { WorkerRepository } from './worker.repository';
import { CourseRepository } from './course.repository';
import { TokenRepository } from './token.repository';

@Module({
  providers: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
  ],
  exports: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
  ],
})
export class RepositoriesModule {}
