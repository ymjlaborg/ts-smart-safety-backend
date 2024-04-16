import { Controller, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';

@Controller('worker/auth')
export class AuthController {
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin() {}

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh() {}

  @Put('deviceToken')
  @HttpCode(HttpStatus.OK)
  async deviceToken() {}
}
