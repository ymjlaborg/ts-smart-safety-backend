import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from '@app/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('작업자 관리')
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

  @ApiOperation({
    summary: '작업자 생성',
    description: '작업자를 생성한다.',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWorkerDto: CreateWorkerDto) {
    return await this.workerService.create(createWorkerDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateById() {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeById() {}
}
