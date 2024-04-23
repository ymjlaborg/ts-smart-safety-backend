import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@app/repositories';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
