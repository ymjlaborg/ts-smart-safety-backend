import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { ListAlertDto } from './dto/list-alert.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('통합 관제')
@Controller('control/alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiOperation({
    description: '전체 알림 목록',
  })
  @ApiBearerAuth('accessToken')
  @Get()
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: Request, @Query() query: ListAlertDto) {
    const id: number = req.user as number;
    console.log(id);
    return await this.alertService.find(id, query);
  }
}
