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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { AlertService } from './alert.service';
import { HttpExceptionFilter } from '@app/filters';
import { TransformInterceptor } from '@app/interceptors';

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
}
