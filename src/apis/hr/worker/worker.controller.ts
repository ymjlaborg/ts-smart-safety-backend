import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
} from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller('hr/worker')
export class WorkerController {
  private logger: Logger = new Logger(WorkerController.name);

  constructor(private readonly workerService: WorkerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async find() {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById() {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create() {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateById() {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeById() {}
}
