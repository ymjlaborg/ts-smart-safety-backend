import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ErrorResultDto, ResultDto } from '@app/dto';

@Controller('worker/auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() signinDto: SigninDto,
  ): Promise<ResultDto<any> | ErrorResultDto> {
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
