import { Injectable, Logger } from '@nestjs/common';
import {
  CourseRepository,
  NodeRepository,
  OfficeRepository,
  WorkerRepository,
} from '@app/repositories';
import { In } from 'typeorm';
import { RedisService } from '@app/redis';

@Injectable()
export class CommonService {
  private readonly logger: Logger = new Logger(CommonService.name);

  constructor(
    private readonly officeRepository: OfficeRepository,
    private readonly workerRepository: WorkerRepository,
    private readonly courseRepository: CourseRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly redisService: RedisService,
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
      relations: ['courses', 'office'],
      select: ['office', 'courses'],
      order: {
        courses: {
          courseID: 'ASC',
        },
      },
    });

    const r = {
      workerName: result.workerName,
      officeName: result.office.officeName,
      courses: result.courses,
    };

    return r;
  }

  /**
   *
   *
   * @param worker
   */
  async dashboard(workerID: number) {
    const courses = await this.coursesByWorker(workerID);
    let courseID: number;
    if (!courses.courses.length) {
      const worker = await this.workerRepository.findOne({
        where: {
          id: workerID,
        },
        select: ['officeID'],
      });

      const courses = await this.courseRepository.findByOfficeID(
        worker.officeID,
      );
      courseID = courses[0].courseID;
    } else {
      courseID = courses.courses[0].courseID;
    }

    const nodeNames = ['Temperature', 'Humidity', 'PM10'];
    const nodes = await this.nodeRepository.findByCourseIDAndNodeNames(
      courseID,
      nodeNames,
    );

    const promises = nodes.map(async (node, index) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await this.redisService.get(
            `wownode:${node.devID}:${node.nodeName}`,
          );

          resolve({
            [nodeNames[index].toLowerCase()]: JSON.parse(result).value,
          });
        } catch (e) {
          reject();
        }
      });
    });

    const results = (await Promise.all(promises)).reduce(
      (prev: object, value: object) => {
        return {
          ...prev,
          ...value,
        };
      },
      {},
    );

    return results;
  }
}
