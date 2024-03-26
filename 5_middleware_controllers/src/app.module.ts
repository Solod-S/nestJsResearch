import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule } from './config.module';
import { UserModule } from '@entities/user/user.module';
import { TypeOrmModule } from '@db/typeorm.module';
// postgres connection
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

@Module({
  imports: [ConfigModule, TypeOrmModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}

//  .forRoutes({ path: 'cats', method: RequestMethod.GET });
// более точечная настройка

//    .exclude(
//   { path: 'cats', method: RequestMethod.GET },
//   { path: 'cats', method: RequestMethod.POST },
//   'cats/(.*)',
// )
// исключаем и разрешаем
// .forRoutes(CatsController);
// импортируем

//  .exclude(
//     { path: 'users', method: RequestMethod.ALL },
//     { path: 'news', method: RequestMethod.ALL },
//   )
//   .forRoutes('*');

// Работает на все роуты кроме users и news

// -------------
// app.use(LoggerMiddleware);
// в main.ts можно подключить таким способом
