import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { UserModule } from '@entities/user/user.module';
import { TypeOrmModule } from '@db/typeorm.module';
// postgres connection

@Module({
  imports: [ConfigModule, TypeOrmModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
