import { Injectable, Logger } from '@nestjs/common';
import { OfficeRepository } from '@app/repositories';

@Injectable()
export class CommonService {
  private readonly logger: Logger = new Logger(CommonService.name);

  constructor(private readonly officeRepository: OfficeRepository) {}

  /**
   * 검사소 목록을 가져온다.
   * @returns
   */
  async office() {
    return await this.officeRepository.findAll();
  }

  async courses(worker, courses) {}

  async dashboard(worker) {}
}
