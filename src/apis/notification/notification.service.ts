import { EventName } from '@app/enum';
import {
  AlertHistoryRepository,
  WorkerAlarmMessageRepository,
  WorkerRepository,
} from '@app/repositories';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);

  constructor(
    private readonly workerRepository: WorkerRepository,
    private readonly alertHistoryRepository: AlertHistoryRepository,
    private readonly workerAlarmMessageRepository: WorkerAlarmMessageRepository,
  ) {}

  // @Cron(CronExpression.EVERY_SECOND)
  async handleResendNotification() {
    this.logger.log(`RUN RESEND NOTIFICATION`);
    // 재전송 타겟을 가져온다.
    const targets =
      await this.workerAlarmMessageRepository.findByResendTarget();

    if (!targets.length) {
      this.logger.log('Not Found Target');
      return;
    }
  }

  @OnEvent(EventName.WorkerPush)
  async handleSendNotification(alertHistory) {
    this.logger.log(`SEND Notification`);
    const targets = await this.workerRepository.findAllByOfficeID(
      alertHistory.course.office.officeID,
    );

    this.logger.log(`TARGET Count = ${targets.length}`);
  }

  /**
   * 발송을 담당하는 메소드
   */
  private async sendNotification() {}
}
