import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerConfig } from '@app/config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { HttpExceptionFilter } from '@app/filters';

async function bootstrap() {
  // Transaction Decorator 적용
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  const globalPrefix: string = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  if (
    process.env.NODE_ENV === 'local' ||
    process.env.NODE_ENV === 'development'
  ) {
    SwaggerConfig(app, {
      title: 'TS 자동차 검사소 스마트 안전 관리 API',
      description: 'TS 자동차 검사소 스마트 안전 관리 API',
    });
  }

  const port: number = Number(process.env.PORT || 3000);
  Logger.log(
    `🚀 Receipt Event Running http://localhost:${port}/${globalPrefix}`,
  );

  await app.listen(3000);
}
bootstrap();
