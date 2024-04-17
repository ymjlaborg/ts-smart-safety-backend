import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import databaseConfig from '@app/config/database.config';

export class MariaDBConfig implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly config: ConfigType<typeof databaseConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mariadb',
      host: this.config.host,
      port: this.config.port,
      username: this.config.auth.username,
      password: this.config.auth.password,
      database: this.config.name,
      synchronize: false,
      dropSchema: false,
      logging: process.env.ENV !== 'production',
      autoLoadEntities: true,
    };
  }
}
