import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('작업자 알림앱')
@Controller('worker/alerts')
export class AlertController {
  @Get()
  @ApiBearerAuth('access')
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
