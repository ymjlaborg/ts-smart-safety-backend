import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenService } from './token.service';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { ListDto } from '@app/dto';
import { TokenServiceName } from '@app/enum';

@ApiTags('작업자 관리 시스템')
@Controller('hr/tokens')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @ApiOperation({
    summary: '작업자 토큰 가져오기',
    description: '현재 작업자의 토큰을 가져온다.',
  })
  @Get('worker/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  async findAllByWorkerId(@Param('id') id: number) {
    return await this.tokenService.findAllByWorkerId(id);
  }

  @ApiOperation({
    summary: '작업자가 가지고 있는 토큰을 삭제한다.',
    description: '현재 작업자의 토큰을 삭제한다.',
  })
  @Delete('worker/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('access'))
  async removeAllByWorkerId(@Param('id') id: number) {
    return await this.tokenService.removeAllWorkerId(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  async findAll(@Query() listDto: ListDto) {
    return await this.tokenService.findAll(listDto);
  }

  @ApiOperation({
    summary: '작업자가 가지고 있는 토큰을 삭제한다.',
    description: '현재 작업자의 토큰을 삭제한다.',
  })
  @Delete('worker/:serviceName/:targetID')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('access'))
  async removeAll(
    @Param('serviceName') serviceName: TokenServiceName,
    @Param('targetID') targetID: number,
  ) {
    return await this.tokenService.removeByServiceNames(serviceName, targetID);
  }
}
