import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { validationSchema } from './validation.scheme';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
