import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { OfficeRepository } from '@app/repositories';
import { CommonService } from './common.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService, OfficeRepository],
})
export class CommonModule {}
