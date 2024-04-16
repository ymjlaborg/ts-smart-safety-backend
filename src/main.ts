import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix: string = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(3000);
}
bootstrap();
