import { Injectable, Logger } from '@nestjs/common';
import {
  CourseRepository,
  NodedataRepository,
  OfficeRepository,
  WorkerRepository,
} from '@app/repositories';
import { In } from 'typeorm';

@Injectable()
export class CommonService {
  private readonly logger: Logger = new Logger(CommonService.name);

  constructor(
    private readonly officeRepository: OfficeRepository,
    private readonly workerRepository: WorkerRepository,
    private readonly courseRepository: CourseRepository,
    private readonly nodedataRepository: NodedataRepository,
  ) {}

  /**
   * 검사소 목록을 가져온다.
   * @returns
   */
  async office() {
    return await this.officeRepository.findAll();
  }

  /**
   * 작업 진로 설정
   *
   * @param workerID
   * @param courseIds
   * @returns
   */
  async updateCourses(workerID: number, courseIds: number[]) {
    const worker = await this.workerRepository.findOne({
      where: {
        id: workerID,
      },
      relations: ['courses'],
    });

    const courses = await this.courseRepository.findBy({
      courseID: In(courseIds),
    });

    worker.courses = courses;

    await this.workerRepository.save(worker);
    return {
      count: courseIds.length,
    };
  }

  /**
   *
   * @param workerId
   */
  async coursesByWorker(workerId: number) {
    const result = await this.workerRepository.findOne({
      where: {
        id: workerId,
      },
      relations: ['courses'],
      select: ['courses'],
    });

    return result.courses.map((course) => ({
      courseID: course.courseID,
      courseName: course.courseName,
    }));
  }

  /**
   *
   *
   * @param worker
   */
  async dashboard(workerId: number) {
    console.log(workerId);
    await this.nodedataRepository.findOne({
      where: {
        lTime: new Date(),
      },
    });
  }
}
