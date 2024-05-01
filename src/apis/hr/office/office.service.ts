import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourseRepository, OfficeRepository } from '@app/repositories';
import { Not } from 'typeorm';

@Injectable()
export class OfficeService {
  private readonly logger: Logger = new Logger(OfficeService.name);

  constructor(
    private configService: ConfigService,
    private readonly officeRepository: OfficeRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  async office() {
    return await this.officeRepository.find({
      where: {
        isAdmin: Not(1),
      },
    });
  }

  async course(officeID: number) {
    return await this.courseRepository.find({
      where: {
        office: {
          officeID,
        },
      },
    });
  }
}
