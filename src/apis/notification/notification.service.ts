import { AlertHistoryEntity, WorkerEntity } from '@app/entities';
import { EventName } from '@app/enum';
import {
  AlertHistoryRepository,
  WorkerAlarmMessageRepository,
  WorkerRepository,
} from '@app/repositories';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { SendResponse } from 'firebase-admin/lib/messaging/messaging-api';
import * as fs from 'fs';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);
  private readonly fcm: admin.messaging.Messaging;

  constructor(
    private readonly workerRepository: WorkerRepository,
    private readonly alertHistoryRepository: AlertHistoryRepository,
    private readonly workerAlarmMessageRepository: WorkerAlarmMessageRepository,
    private readonly configService: ConfigService,
  ) {
    const serviceAccountKey = this.configService.get<string>(
      'notification.serviceAccountKey',
    );
    const serviceAccount: ServiceAccount = JSON.parse(
      fs.readFileSync(serviceAccountKey, 'utf-8'),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    this.fcm = admin.messaging();
  }

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

    console.log(targets);

    // 타겟 정보를 가져온다.
  }

  @OnEvent(EventName.WorkerPush)
  async handleSendNotification(alertHistory: AlertHistoryEntity) {
    // 전송 타겟을 지정한다. 업무 진로에 대한 작용..
    const targets = await this.workerRepository.findAllCourseID(
      alertHistory.courseID,
    );

    if (!targets.length) {
      this.logger.log('Not Found Target');
      return;
    }

    // 내용과 작업자의 정보를 workerAlertMessage에 넣는다.
    const createPromises = targets.map(async (worker: WorkerEntity) => {
      const saveResult = await this.workerAlarmMessageRepository.save({
        alertHistoryID: alertHistory.id,
        workerID: worker.id,
      });

      return {
        id: saveResult.id,
        workerID: worker.id,
        mobileToken: worker.mobileToken,
        watchToken: worker.watchToken,
      };
    });

    const createdResult = await Promise.all(createPromises);
    const data: Record<string, string> = {
      alertID: alertHistory.id.toString(),
      alertLevel: alertHistory.alertLevel.toString(),
      alertType: alertHistory.alertType.toString(),
      alertDataValue: alertHistory.alertDataValue || '',
      alertTitle: alertHistory.alertTitle,
      alertContent: alertHistory.alertContent,
      entranceType:
        alertHistory.entranceType === null
          ? ''
          : alertHistory.entranceType.toString(),
      course: JSON.stringify({
        courseID: alertHistory.course.courseID,
        courseName: alertHistory.course.courseName,
      }),
    };

    const notificationResult = await this.sendNotificationChunks(
      createdResult,
      data,
    );

    const updatePromises = notificationResult.map(async (result) => {
      return await this.workerAlarmMessageRepository.save(result);
    });

    await Promise.all(updatePromises);
  }

  /**
   *
   * @param targets
   */
  private async sendNotificationChunks(
    targets: Record<string, string | number>[],
    data: Record<string, string>,
    chunkSize: number = 1000,
  ) {
    let result = [];

    for (let i = 0; i < targets.length; i += chunkSize) {
      const chunk = targets.slice(i, i + chunkSize);
      const chunkResult = await this.sendNotification(chunk, data);
      result = [...result, ...chunkResult];
    }

    return result;
  }

  /**
   * 메시지 발송
   *
   * @param targets
   * @param data
   * @returns
   */
  private async sendNotification(
    targets: Record<string, string | number>[],
    data: Record<string, string>,
  ) {
    const mobileTokens = targets.map((target) => target.mobileToken);
    const watchTokens = targets.map((target) => target.watchToken);

    const mobileMessages: admin.messaging.MulticastMessage = {
      notification: {
        title: data.alertTitle,
        body: data.alertContent,
      },
      data,
      tokens: mobileTokens as string[],
    };
    const watchMessages: admin.messaging.MulticastMessage = {
      data,
      notification: {
        title: data.alertTitle,
        body: data.alertContent,
      },
      tokens: watchTokens as string[],
    };

    const response = await this.fcm.sendEachForMulticast(mobileMessages);
    await this.fcm.sendEachForMulticast(watchMessages);

    return response.responses.map(
      (sendResponse: SendResponse, index: number) => {
        const target = targets[index];
        const deliveryStatus: string = sendResponse.success
          ? 'success'
          : 'error';

        return {
          id: target.id,
          workerID: target.workerID,
          messageID: sendResponse.messageId,
          deliveryStatus,
          sendAt: new Date(),
        };
      },
    );
  }
}
