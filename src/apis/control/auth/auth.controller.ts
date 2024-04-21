import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { Request } from 'express';

@ApiTags('통합 관제')
@Controller('control/auth')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() siginDto: SigninDto) {}

  @Get('refresh')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {}
}
