import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis, RedisOptions } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    const { host, port, usePassword, password } =
      this.configService.get('redis');

    const redisOption: RedisOptions = {
      host,
      port,
    };

    if (usePassword) {
      redisOption.password = password;
    }

    this.client = new Redis(redisOption);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
}
