import { RepositoriesModule } from '@app/repositories';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from './notification.service';

@Module({
  imports: [ScheduleModule.forRoot(), RepositoriesModule],
  providers: [NotificationService],
})
export class NotificationModule {}
