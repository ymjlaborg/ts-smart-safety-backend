import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CourseRepository,
  NodeRepository,
  OfficeRepository,
  WorkerRepository,
} from '@app/repositories';
import { In } from 'typeorm';
import { RedisService } from '@app/redis';
import { WorkerStatus } from '@app/enum';

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
    const worker = await this.workerRepository.findOne({
      where: {
        id: workerId,
        workerStatus: WorkerStatus.Use,
      },
    });

    if (!worker) {
      throw new BadRequestException('작업자가 존재하지 않습니다.');
    }

    // 전체 코스 목록
    const courses = await this.courseRepository.findByOfficeID(worker.officeID);

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

    const newCourses = courses.map((course) => {
      const selected: boolean = !!result.courses.find(
        (v) => v.courseID === course.courseID,
      );
      return {
        courseID: course.courseID,
        courseName: course.courseName,
        selected,
      };
    });

    const r = {
      workerName: result.workerName,
      officeName: result.office.officeName,
      courses: newCourses,
    };

    return r;
  }

  /**
   * 워치의 대시보드를 보여준다.
   *
   * @param worker
   */
  async dashboard(workerID: number) {
    const { courses } = await this.coursesByWorker(workerID);

    const selectedCourses = courses.filter((c) => c.selected);

    if (selectedCourses.length === 0) {
      throw new BadRequestException();
    }

    const courseID = selectedCourses[0].courseID;

    const nodeNames = ['Temperature', 'Humidity', 'PM10'];
    const nodes = await this.nodeRepository.findByCourseIDAndNodeNames(
      courseID,
      nodeNames,
    );

    const promises = [];

    // [2024.07.15]
    // 각 값이 소수점 1자리만 나오도록 한다.
    nodes.forEach((node) => {
      const p = new Promise(async (resolve, reject) => {
        try {
          console.log(node);
          const result = await this.redisService.get(
            `wownode:${node.devID}:${node.nodeName}`,
          );

          this.logger.log(
            `wownode:${node.devID}:${node.nodeName}`,
            parseInt(JSON.parse(result).value || 0, 10),
          );

          let value = parseFloat(JSON.parse(result).value || 0);

          if (isNaN(value)) {
            value = 0;
          }

          const r = value.toFixed(1);
          let key = '';

          // [2024.09.09] 리턴에 대한 이슈
          for (let i = 0; i < nodeNames.length; i++) {
            if (node.nodeName.includes(nodeNames[i])) {
              key = nodeNames[i];
              break;
            }
          }

          resolve({
            [key]: r,
          });
        } catch (e) {
          reject();
        }
      });

      promises.push(p);
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
