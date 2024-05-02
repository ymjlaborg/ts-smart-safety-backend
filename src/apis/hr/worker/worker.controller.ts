import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto, ListDto, UpdateWorkerDto } from '@app/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('작업자 관리')
@Controller('hr/workers')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class WorkerController {
  private logger: Logger = new Logger(WorkerController.name);

  constructor(private readonly workerService: WorkerService) {}

  @ApiOperation({
    summary: '작업자 목록',
    description: '작업자 목록을 가져온다.',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  async find(@Query() listDto: ListDto) {
    return await this.workerService.find(listDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  async findById(@Param('id') id: number) {
    return await this.workerService.findById(id);
  }

  @ApiOperation({
    summary: '작업자 생성',
    description: '작업자를 생성한다.',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('access'))
  async create(@Body() createWorkerDto: CreateWorkerDto) {
    return await this.workerService.create(createWorkerDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  async updateById(
    @Param('id') id: number,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ) {
    return await this.workerService.updateById(id, updateWorkerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('access'))
  async removeById(@Param('id') id: number) {
    await this.workerService.removeById(id);
  }
}
