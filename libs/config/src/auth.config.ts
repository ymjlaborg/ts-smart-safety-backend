import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  saltOrRounds: process.env.AUTH_SALT_ROUNDS,
  jwtKey: process.env.AUTH_JWT_SECRET,
  accessKey: process.env.AUTH_JWT_ACCESS_KEY,
  accessExpiresIn: process.env.AUTH_JWT_ACCESS_TIMEOUT,
  refreshKey: process.env.AUTH_JWT_REFRESH_KEY,
  refreshExpiresIn: process.env.AUTH_JWT_REFRESH_TIMEOUT,
}));
