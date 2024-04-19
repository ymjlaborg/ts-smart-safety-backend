import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '작업자 알림 상세',
    description: '대상 아이디의 상세 정보를 가져온다.',
  })
  @Get(':id')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number) {
    console.log(id);
    return this.alertService.findById(id);
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '전체 알림 삭제',
    description: '작업자가 가지고 있는 전체 알림 삭제',
  })
  @Delete()
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll(@Req() req: Request) {
    const id = req.user as number;
    await this.alertService.removeAll(id);
  }

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '대상 아이디 삭제',
    description: '대상 아이디 삭제',
  })
  @Delete(':id')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeById(@Param('id') id: number) {
    await this.alertService.removeById(id);
  }
}
