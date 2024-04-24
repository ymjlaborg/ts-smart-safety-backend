import {
  Controller,
  HttpCode,
  HttpStatus,
  Sse,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { AlertService } from './alert.service';
import { HttpExceptionFilter } from '@app/filters';
import { TransformInterceptor } from '@app/interceptors';

@ApiTags('대기실')
@Controller('waiting/alerts')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiOperation({
    summary: '화재 발생 알림',
    description: '화재 발생 시 알림 발생',
  })
  @ApiBearerAuth('accessToken')
  @Sse('fire')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  fire(): Observable<any> {
    return this.alertService.getFireStream().pipe(map((value) => value));
  }

  @ApiOperation({
    summary: '실시간 노드 데이터 정보',
    description: '노드 데이터 정보 및 연결 확인 데이터를 실시간으로 불러온다.',
  })
  @ApiBearerAuth('accessToken')
  @Sse('nodedata')
  @HttpCode(HttpStatus.OK)
  nodedata(): Observable<any> {
    return this.alertService.getNodedataStream().pipe(map(() => ({})));
  }
}
