import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // валидация для каждого метода
  await app.listen(3000);
}
bootstrap();

// docker-compose up -d --build
// http://127.0.0.1:5050/browser/
// nest_test
