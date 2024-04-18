import { Injectable, Logger } from '@nestjs/common';
import { ListOfficeDto } from '@app/dto';
import { OfficeRepository } from '@app/repositories';

@Injectable()
export class CommonService {
  private readonly logger: Logger = new Logger(CommonService.name);

  constructor(private readonly officeRepository: OfficeRepository) {}

  async office(): Promise<ListOfficeDto[]> {
    return await this.officeRepository.findAll();
  }

  async courses(worker, courses) {}

  async dashboard(worker) {}
}
