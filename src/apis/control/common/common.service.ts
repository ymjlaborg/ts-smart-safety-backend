import { EventName } from '@app/enum';
import {
  AlertHistoryRepository,
  CameraRepository,
  CourseRepository,
} from '@app/repositories';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';
import { ListAlertDto } from './dto/list-alert.dto';

@Injectable()
export class CommonService {
  private readonly logger: Logger = new Logger(CommonService.name);
  private alertSubject = new Subject<any>();
  private fireSubject = new Subject<any>();
  private deviceSubject = new Subject<any>();

  constructor(
    private readonly alertHistoryRepository: AlertHistoryRepository,
    private readonly courseRepository: CourseRepository,
    private readonly cameraRepository: CameraRepository,
  ) {}

  /**
   * 전체 알림 목록을 가져온다.
   * @param userId
   * @param query
   */
  async getAlertsAll(userId: number, query: ListAlertDto) {
    const totalCount = await this.alertHistoryRepository.countAll(
      userId,
      query,
    );
    const list = await this.alertHistoryRepository.findAll(userId, query);
    const totalPage = Math.ceil(totalCount / query.limit);

    return {
      list,
      pagination: {
        totalCount,
        totalPage,
        currentPage: query.page,
      },
    };
  }

  /**
   * 사용자 아이디로 설치된 카메라 전부 가져온다.
   *
   * @param userId
   * @returns
   */
  async getCamerasByUserId(userId: number) {
    return await this.courseRepository.findCamerasByOfficeID(userId);
  }

  /**
   *
   * @param userId
   */
  async getCourses(userId: number) {
    return await this.courseRepository.findByOfficeID(userId);
  }

  @OnEvent(EventName.ControlAlert)
  handleAlert() {}

  getAlertStream() {
    return this.alertSubject.asObservable();
  }

  handleDevice() {}

  getDeviceStream() {
    return this.deviceSubject.asObservable();
  }

  @OnEvent(EventName.FireAlert)
  handleFire() {
    this.fireSubject.next({});
  }

  /**
   * 전달 스트림
   * @returns
   */
  getFireStream() {
    return this.fireSubject.asObservable();
  }
}
