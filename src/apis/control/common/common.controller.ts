import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  Sse,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { Observable, map } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { ListAlertDto } from './dto/list-alert.dto';
import { Request } from 'express';

@ApiTags('통합 관제')
@Controller('control')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({
    summary: '알림 목록',
    description: '알림 목록을 조건에 따라 가져오기',
  })
  @ApiBearerAuth('accessToken')
  @Get('alerts')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async alerts(@Req() req: Request, @Query() query: ListAlertDto) {
    const id: number = req.user as number;
    return await this.commonService.getAlertsAll(id, query);
  }

  @ApiOperation({
    summary: '진로 정보',
    description: '진로 목록을 가져온다.',
  })
  @ApiBearerAuth('accessToken')
  @Get('courses')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async courses(@Req() req: Request) {
    const id: number = req.user as number;
    return await this.commonService.getCourses(id);
  }

  @ApiOperation({
    summary: '카메라 정보',
    description: '',
  })
  @ApiBearerAuth('accessToken')
  @Get('cameras')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async cameras(@Req() req: Request) {
    const id: number = req.user as number;
    return await this.commonService.getCamerasByUserId(id);
  }

  @ApiOperation({
    summary: '알림의 실시간 알림',
    description: '알림에 대한 실시간 정보를 가져온다.',
  })
  @ApiBearerAuth('accessToken')
  @Sse('alerts/now')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  pushAlerts(): Observable<any> {
    return this.commonService.getAlertStream().pipe(map((value) => value));
  }

  @ApiOperation({
    summary: '화재 발생 알림',
    description: '화재 발생 시 알림 발생',
  })
  @ApiBearerAuth('accessToken')
  @Sse('fire')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  fire(): Observable<any> {
    return this.commonService.getFireStream().pipe(map((value) => value));
  }

  @ApiOperation({
    summary: '실시간 노드 데이터 정보',
    description: '노드 데이터 정보 및 연결 확인 데이터를 실시간으로 불러온다.',
  })
  @ApiBearerAuth('accessToken')
  @Sse('devices')
  @HttpCode(HttpStatus.OK)
  device(): Observable<any> {
    return this.commonService.getDeviceStream().pipe(map(() => ({})));
  }
}
