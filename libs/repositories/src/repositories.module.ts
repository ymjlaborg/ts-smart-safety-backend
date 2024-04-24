import { Module } from '@nestjs/common';
import { OfficeRepository } from './office.repository';
import { WorkerRepository } from './worker.repository';
import { CourseRepository } from './course.repository';
import { TokenRepository } from './token.repository';
import { WorkerAlarmMessageRepository } from './worker-alarm-message.repository';
import { NodedataRepository } from './nodedata.repository';
import { AlertHistoryRepository } from './alert-history.repository';
import { NodeRepository } from './node.repository';
import { CameraRepository } from './camera.repository';
import { DeviceRepository } from './device.repository';

@Module({
  providers: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
    AlertHistoryRepository,
    WorkerAlarmMessageRepository,
    NodedataRepository,
    NodeRepository,
    CameraRepository,
    DeviceRepository,
  ],
  exports: [
    OfficeRepository,
    WorkerRepository,
    CourseRepository,
    TokenRepository,
    AlertHistoryRepository,
    WorkerAlarmMessageRepository,
    NodedataRepository,
    NodeRepository,
    CameraRepository,
    DeviceRepository,
  ],
})
export class RepositoriesModule {}
