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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @ApiOperation({
    summary: '통합 관제 로그인',
    description: '통합 관제 로그인',
  })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto) {
    return await this.authService.signin(signinDto);
  }

  @ApiOperation({
    summary: '통합 관제 인증키 업데이트',
    description: '통합 관제 인증키 업데이트',
  })
  @ApiBearerAuth('refreshToken')
  @Post('refresh')
  @UseGuards(AuthGuard('refresh'))
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {
    const id: number = req.user as number;
    return await this.authService.refresh(id);
  }
}
