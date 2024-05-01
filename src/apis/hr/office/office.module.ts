import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [RepositoriesModule],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
