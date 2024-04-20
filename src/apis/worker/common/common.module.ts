import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { RepositoriesModule } from '@app/repositories';
import { CommonService } from './common.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
