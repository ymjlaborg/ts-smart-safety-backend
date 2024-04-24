import { HttpExceptionFilter } from '@app/filters';
import { TransformInterceptor } from '@app/interceptors';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CameraService } from './camera.service';

@ApiTags('대기실')
@Controller('waiting/cameras')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class CameraController {
  private readonly logger: Logger = new Logger(CameraController.name);

  constructor(private readonly cameraService: CameraService) {}

  @ApiOperation({
    summary: '카메라 정보',
    description: '카메라 정보를 가져온다.',
  })
  @ApiBearerAuth('accessToken')
  @Get()
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: Request) {
    const userId: number = req.body as number;
    return await this.cameraService.find(userId);
  }
}
