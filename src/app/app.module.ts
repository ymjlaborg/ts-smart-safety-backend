import { Module } from '@nestjs/common';

import { WorkerModule } from 'src/modules/worker/worker.module';
import { HookModule } from 'src/modules/hook/hook.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@app/config';

@Module({
  imports: [ConfigModule, WorkerModule, HookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
