import * as joi from 'joi';

export const validationSchema = joi.object({
  DATABASE_HOST: joi.string().required(),
  DATABASE_PORT: joi.number().required(),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  AUTH_SALT_ROUNDS: joi.number().required(),
  AUTH_JWT_SECRET: joi.string().required(),
  AUTH_JWT_ACCESS_KEY: joi.string().required(),
  AUTH_JWT_MOBILE_TIMEOUT: joi.string().required(),
  AUTH_JWT_ACCESS_TIMEOUT: joi.string().required(),
  AUTH_JWT_REFRESH_KEY: joi.string().required(),
  AUTH_JWT_REFRESH_TIMEOUT: joi.string().required(),
  AUTH_X_API_KEY: joi.string().required(),
  AUTH_X_API_SECRET_KEY: joi.string().required(),
  AUTH_X_API_IV: joi.string().required(),
  REDIS_HOST: joi.string().required(),
  REDIS_PORT: joi.number().required(),
  REDIS_USE_PASSWORD: joi.boolean().required(),
  REDIS_PASSWORD: joi.string(),
});
