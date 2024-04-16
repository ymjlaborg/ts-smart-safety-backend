import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('hook')
export class HookController {
  @Post('alert')
  @HttpCode(HttpStatus.OK)
  async alert() {}

  @Post('nodedata')
  @HttpCode(HttpStatus.OK)
  async nodedata() {}
}
