import { Controller, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';

@Controller('worker')
export class CommonController {
  @Get('offices')
  @HttpCode(HttpStatus.OK)
  async findOffice() {}

  @Put('courses')
  @HttpCode(HttpStatus.OK)
  async updateCourses() {}

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  async dashboard() {}
}
