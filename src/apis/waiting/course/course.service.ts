import { CourseRepository } from '@app/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  /**
   * 접속한 아이디 (검사소)에 속한 모든 진로를 가져온다.
   * @param officeID
   */
  async findByOfficeID(officeID: number) {
    return await this.courseRepository.findByOfficeID(officeID);
  }
}
