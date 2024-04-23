import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HookService } from './hook.service';
import { AlertDto } from './dto/alert.dto';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { AuthGuard } from '@nestjs/passport';
import { NodeDataDto } from './dto/node-data.dto';

@ApiTags('메시지 전달')
@Controller('hook')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class HookController {
  constructor(private readonly hookService: HookService) {}

  @ApiOperation({
    summary: '알림 전달',
    description: '알림 전달',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: '접근 인증 키',
  })
  @Post('alert')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('xapikey'))
  async alert(@Body() alertDto: AlertDto) {
    await this.hookService.sendAlert(alertDto.alertId);
  }

  @ApiOperation({
    summary: '노드 데이터 전달',
    description: '노드 데이터 전달',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: '접근 인증 키',
  })
  @Post('nodedata')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('xapikey'))
  async nodedata(@Body() nodedatas: NodeDataDto[]) {
    await this.hookService.sendNodedatas(nodedatas);
  }
}
