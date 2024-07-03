import { HttpExceptionFilter } from '@app/filters';
import { TransformInterceptor } from '@app/interceptors';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CourseService } from './course.service';

@ApiTags('대기실')
@Controller('waiting/courses')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class CourseController {
  private readonly logger: Logger = new Logger(CourseController.name);

  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({
    summary: '진로 가져오기',
    description: '접속한 센터의 진로 가져오기',
  })
  @ApiBearerAuth('accessToken')
  @Get()
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async findByOfficeID(@Req() req: Request) {
    const id: number = req.user as number;
    return await this.courseService.findByOfficeID(id);
  }
}
