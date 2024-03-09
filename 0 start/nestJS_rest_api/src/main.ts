import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'; // Импорт Logger из @nestjs/common
import '@nestjs/config';

import * as packageJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Great API')
    .setDescription('The list of greatest persons')
    .setVersion(packageJson.version)
    .addTag('Wellcome')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // http://localhost:9999/api
  // http://localhost:9999/api-json
  await app.listen(9999);
}
bootstrap().then(() => Logger.log(`APP IS STARTED AT http://localhost:9999/`));

// nest g mo users
// генерируем модуль пользователя
// nest g s users
// генерируем сервис пользователя
// nest g co users
// генерируем контролер пользователя
