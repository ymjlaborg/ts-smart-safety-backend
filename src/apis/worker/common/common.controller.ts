import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { Request } from 'express';
import { UpdateCoursesDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('작업자 알림앱')
@Controller('worker')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({
    summary: '검사소 목록',
    description: '검사소 목록을 가져온다',
  })
  @Get('offices')
  @HttpCode(HttpStatus.OK)
  async offices() {
    return await this.commonService.office();
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사용자 작업 진로 목록',
    description: '사용자 작업 진로 목록',
  })
  @Get('courses')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async coursesByWorker(@Req() req: Request) {
    console.log(req.user);
    const id = req.user as number;
    return await this.commonService.coursesByWorker(id);
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사용자 작업 진로 업데이트',
    description: '사용자 작업 진로 업데이트',
  })
  @Put('courses')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async updateCourses(
    @Req() req: Request,
    @Body() updateCourseDto: UpdateCoursesDto,
  ) {
    const id = req.user as number;
    return await this.commonService.updateCourses(id, updateCourseDto.courseID);
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '사용자 작업 진로 업데이트',
    description: '사용자 작업 진로 업데이트',
  })
  @Get('dashboard')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async dashboard(@Req() req: Request) {
    const id = req.user as number;
    return await this.commonService.dashboard(id);
  }
}
