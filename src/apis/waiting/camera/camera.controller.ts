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

@ApiTags('대기실')
@Controller('waiting/cameras')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class CameraController {
  private readonly logger: Logger = new Logger(CameraController.name);

  @Get()
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: Request) {
    const userId: number = req.body as number;
    this.logger.log(userId);
  }
}
