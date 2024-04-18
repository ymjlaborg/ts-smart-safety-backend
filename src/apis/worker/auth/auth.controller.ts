import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, UpdateDeviceToken } from '@app/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('작업자 알림앱')
@Controller('worker/auth')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '작업자 로그인',
    description: '작업자가 로그인을 진행한다.',
  })
  @ApiBody({
    type: SigninDto,
  })
  @ApiOkResponse({
    description: '로그인 성공',
  })
  async signin(@Body() signinDto: SigninDto): Promise<any> {
    return await this.authService.signin(signinDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('refresh'))
  @ApiBearerAuth('refreshToken')
  @ApiOperation({
    summary: '토큰 재발급',
    description: '토큰을 재발급 한다.',
  })
  async refresh(@Req() req: Request) {
    const { id } = req.user as {
      id: number;
    };

    return await this.authService.refresh(id);
  }

  @Put('deviceToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '디바이스 토큰 저장',
    description: '디바이스 토큰을 저장한다.',
  })
  async deviceToken(
    @Req() req: Request,
    @Body() { deviceToken }: UpdateDeviceToken,
  ) {
    const id: number = req.user as number;

    console.log(id, deviceToken);

    return await this.authService.deviceToken(id, deviceToken);
  }
}
