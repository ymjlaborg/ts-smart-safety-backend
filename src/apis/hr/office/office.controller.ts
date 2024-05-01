import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@app/interceptors';
import { HttpExceptionFilter } from '@app/filters';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('작업소 관련')
@Controller('hr')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class OfficeController {
  private logger: Logger = new Logger(OfficeController.name);

  constructor(private readonly officeService: OfficeService) {}

  @ApiOperation({
    summary: '회사 가져오기',
    description: '회사 정보를 가져온다..',
  })
  @Get('offices')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  async office() {
    return await this.officeService.office();
  }

  @Get('courses/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  async course(@Param('id') id: number) {
    return await this.officeService.course(id);
  }
}
