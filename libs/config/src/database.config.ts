import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  name: process.env.DATABASE_NAME,
  auth: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
}));
