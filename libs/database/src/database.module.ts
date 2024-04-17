import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MariaDBConfig } from './mariadb.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MariaDBConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          Logger.error(`Invalid options pass...`);
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
})
export class DatabaseModule {}
