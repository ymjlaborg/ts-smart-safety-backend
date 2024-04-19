import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AlertService } from './alert.service';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '@app/interceptors';
import { ListAlertDto } from './dto/list-alert.dto';

@ApiTags('작업자 알림앱')
@Controller('worker/alerts')
@UseInterceptors(TransformInterceptor)
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '작업자 알림 목록',
    description: '작업자가 보관 중인 알림 목록을 가져온다.',
  })
  @Get()
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: Request, @Query() listDto: ListAlertDto) {
    const id = req.user as number;
    return this.alertService.find(id, listDto);
  }

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
