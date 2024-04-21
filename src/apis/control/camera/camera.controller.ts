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
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CameraService } from './camera.service';

@ApiTags('통합 관제')
@Controller('control/cameras')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class CameraController {
  private readonly logger: Logger = new Logger(CameraController.name);

  constructor(private readonly cameraService: CameraService) {}

  @Get()
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: Request) {
    const userId: number = req.body as number;
    this.logger.log(userId);
  }
}
