import {
  Body,
  Controller,
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

@ApiTags('대기실')
@Controller('waiting/auth')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '대기실 로그인',
    description: '대기실 사용자 로그인',
  })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto) {
    return await this.authService.signin(signinDto);
  }

  @ApiOperation({
    summary: '대기실 인증 토큰 업데이트',
    description: '대기실 인증 토큰 업데이트',
  })
  @ApiBearerAuth('refreshToken')
  @Post('refresh')
  @UseGuards(AuthGuard('refresh'))
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {
    const id: number = req.body as number;
    return await this.authService.refresh(id);
  }

  @ApiOperation({
    summary: '대기실 로그아웃',
    description: '대기실 사용자 로그아웃',
  })
  @Post('signout')
  @UseGuards(AuthGuard('access'))
  @HttpCode(HttpStatus.OK)
  async signout(@Req() req: Request) {
    const id: number = req.body as number;
    return await this.authService.signout(id);
  }
}
