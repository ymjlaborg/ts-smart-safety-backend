import { CourseRepository } from '@app/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CameraService {
  constructor(private readonly courseRepository: CourseRepository) {}

  /**
   * 접속한 정보의 카메라 정보를 가져온다.
   *
   * @param userId
   * @returns
   */
  async find(userId: number) {
    return await this.courseRepository.findCamerasByOfficeID(userId, true);
  }
}
