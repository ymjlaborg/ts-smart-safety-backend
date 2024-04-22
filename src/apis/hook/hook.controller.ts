import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HookService } from './hook.service';
import { AlertDto } from './dto/alert.dto';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';

@ApiTags('메시지 전달')
@Controller('hook')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class HookController {
  constructor(private readonly hookService: HookService) {}

  @Post('alert')
  @HttpCode(HttpStatus.OK)
  async alert(@Body() alertDto: AlertDto) {
    await this.hookService.sendAlarm(alertDto.alertId);
  }

  @Post('nodedata')
  @HttpCode(HttpStatus.OK)
  async nodedata() {}
}
