import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from '@app/dto';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@app/interceptors';

@ApiTags('작업자 알림앱')
@Controller('worker/auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto): Promise<any> {
    return await this.authService.signin(signinDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh() {
    return await this.authService.refresh();
  }

  @Put('deviceToken')
  @HttpCode(HttpStatus.OK)
  async deviceToken() {
    return await this.authService.deviceToken();
  }
}
