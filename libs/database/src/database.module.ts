import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MariaDBConfig } from './mariadb.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MariaDBConfig,
    }),
  ],
})
export class DatabaseModule {}
