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

@ApiTags('메시지 전달')
@Controller('hook')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class HookController {
  constructor(private readonly hookService: HookService) {}

  @ApiOperation({
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
    await this.hookService.sendAlarm(alertDto.alertId);
  }

  @ApiHeader({
    name: 'x-api-key',
    description: '접근 인증 키',
  })
  @Post('nodedata')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('xapikey'))
  async nodedata() {}
}
