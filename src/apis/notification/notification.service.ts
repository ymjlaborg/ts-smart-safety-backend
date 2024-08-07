import { AlertHistoryEntity, WorkerEntity } from '@app/entities';
import { EventName } from '@app/enum';
import {
  WorkerAlarmMessageRepository,
  WorkerRepository,
} from '@app/repositories';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { SendResponse } from 'firebase-admin/lib/messaging/messaging-api';
import * as fs from 'fs';
import { CronJob } from 'cron';

@Injectable()
export class NotificationService implements OnModuleInit {
  private readonly logger: Logger = new Logger(NotificationService.name);
  private readonly fcm: admin.messaging.Messaging;

  constructor(
    private readonly workerRepository: WorkerRepository,
    private readonly workerAlarmMessageRepository: WorkerAlarmMessageRepository,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
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

  onModuleInit() {
    const useResend = JSON.parse(
      this.configService.get('notification.useResend'),
    );
    this.logger.debug(`MODULE INIT!! => ${useResend}`);

    const job = new CronJob(CronExpression.EVERY_SECOND, async () => {
      await this.handleResendNotification();
    });

    this.schedulerRegistry.addCronJob('resend-notification', job);
    if (useResend) {
      this.logger.debug('USE RESEND!');
      job.start();
    } else {
      this.logger.debug('NOT USE RESEND!');
      job.stop();
    }
  }

  async handleResendNotification() {
    this.logger.log(`RUN RESEND NOTIFICATION`);
    // 재전송 타겟을 가져온다.
    const targets =
      await this.workerAlarmMessageRepository.findByResendTarget();

    if (!targets.length) {
      this.logger.log('Not Found Target');
      return;
    }

    this.logger.log(`RESEND TARGET COUNT = ${targets.length}`);

    const sendPromises = targets.map(async (target) => {
      const data: Record<string, string> = {
        alertID: target.id.toString(),
        alertLevel: target.alertHistory.alertLevel.toString(),
        alertType: target.alertHistory.alertType.toString(),
        alertDataValue: target.alertHistory.alertDataValue || '',
        alertTitle: target.alertHistory.alertTitle,
        alertContent: target.alertHistory.alertContent,
        entranceType:
          target.alertHistory.entranceType === null
            ? ''
            : target.alertHistory.entranceType.toString(),
        course: JSON.stringify({
          courseID: target.alertHistory.course.courseID,
          courseName: target.alertHistory.course.courseName,
        }),
      };

      const t = {
        id: target.id,
        workerID: target.workerID,
        mobileToken: target.worker.mobileToken,
        watchToken: target.worker.watchToken,
      };

      return await this.sendNotificationChunks([t], data);
    });

    const sendResults = await Promise.all(sendPromises);

    sendResults.forEach(async (result) => {
      const { id, workerID, messageID, deliveryStatus, sendAt } = result[0];
      const { sendCount } = await this.workerAlarmMessageRepository.findOne({
        where: {
          id,
        },
        select: ['sendCount'],
      });

      await this.workerAlarmMessageRepository.save({
        id,
        workerID,
        messageID,
        deliveryStatus,
        sendAt,
        sendCount: sendCount + 1,
      });
    });
    // 타겟 정보를 가져온다.
  }

  @OnEvent(EventName.WorkerPush)
  async handleSendNotification(alertHistory: AlertHistoryEntity) {
    // 전송 타겟을 지정한다. 업무 진로에 대한 작용..
    const targets = await this.workerRepository.findAllCourseID(
      alertHistory.course.courseID,
    );

    this.logger.log('------------------------------------------------');
    this.logger.log(`발송 대상 진로 => ${alertHistory.course.courseName}`);
    this.logger.log(`발송 대상 인원 수 => ${targets.length} 인`);
    this.logger.log('------------------------------------------------');

    if (!targets.length) {
      this.logger.log('Not Found Target');
      return;
    }

    const createPromises = [];

    targets.forEach((worker: WorkerEntity) => {
      const p = new Promise(async (resolve, reject) => {
        try {
          const saveResult = await this.workerAlarmMessageRepository.save({
            alertHistoryID: alertHistory.id,
            workerID: worker.id,
          });

          resolve({
            id: saveResult.id,
            workerID: worker.id,
            mobileToken: worker.mobileToken,
            watchToken: worker.watchToken,
          });
        } catch (err) {
          reject();
        }
      });

      createPromises.push(p);
    });

    // 내용과 작업자의 정보를 workerAlertMessage에 넣는다.
    // const createPromises = targets.map(async (worker: WorkerEntity) => {
    //   const saveResult = await this.workerAlarmMessageRepository.save({
    //     alertHistoryID: alertHistory.id,
    //     workerID: worker.id,
    //   });

    //   return {
    //     id: saveResult.id,
    //     workerID: worker.id,
    //     mobileToken: worker.mobileToken,
    //     watchToken: worker.watchToken,
    //   };
    // });

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

    const updatePromises = [];

    notificationResult.forEach((result) => {
      updatePromises.push(this.workerAlarmMessageRepository.save(result));
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
    const watchRes = await this.fcm.sendEachForMulticast(watchMessages);

    this.logger.log(
      `SEND WATCH >> FAIL COUNT >>  ${watchRes.failureCount} / SUCCESS COUNT >>  ${watchRes.successCount}`,
    );

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
