import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { RepositoriesModule } from '@app/repositories';
import { CommonService } from './common.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [RepositoriesModule, RedisModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
