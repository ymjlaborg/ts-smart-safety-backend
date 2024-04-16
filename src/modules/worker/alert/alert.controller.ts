import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('worker/alerts')
export class AlertController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async find() {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById() {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll() {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeById() {}
}
