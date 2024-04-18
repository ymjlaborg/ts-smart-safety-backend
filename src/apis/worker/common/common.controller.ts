import { Controller, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { ListOfficeDto, ResultDto } from '@app/dto';

@Controller('worker')
@ApiTags('작업자 알림앱')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('offices')
  @HttpCode(HttpStatus.OK)
  async offices(): Promise<ResultDto<ListOfficeDto[]>> {
    const data = await this.commonService.office();
    return new ResultDto<ListOfficeDto[]>(HttpStatus.OK, data);
  }

  @Put('courses')
  @HttpCode(HttpStatus.OK)
  async updateCourses() {}

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  async dashboard() {}
}
