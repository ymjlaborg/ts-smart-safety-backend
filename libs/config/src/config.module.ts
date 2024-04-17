import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { validationSchema } from './validation.scheme';
import databaseConfig from './database.config';
import authConfig from './auth.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, authConfig],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
