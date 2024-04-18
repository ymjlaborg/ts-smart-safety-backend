import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { ApiModule } from 'src/apis/api.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
