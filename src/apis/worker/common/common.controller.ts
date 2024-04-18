import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { ListOfficeDto } from '@app/dto';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';

@ApiTags('작업자 알림앱')
@Controller('worker')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('offices')
  @HttpCode(HttpStatus.OK)
  async offices(): Promise<ListOfficeDto[]> {
    return await this.commonService.office();
  }

  @Put('courses')
  @HttpCode(HttpStatus.OK)
  async updateCourses() {}

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  async dashboard() {}
}
