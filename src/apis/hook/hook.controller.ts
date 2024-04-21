import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HookService } from './hook.service';

@ApiTags('메시지 전달')
@Controller('hook')
export class HookController {
  constructor(private readonly hookService: HookService) {}

  @Post('alert')
  @HttpCode(HttpStatus.OK)
  async alert() {
    await this.hookService.sendAlarm(551);
  }

  @Post('nodedata')
  @HttpCode(HttpStatus.OK)
  async nodedata() {}
}
