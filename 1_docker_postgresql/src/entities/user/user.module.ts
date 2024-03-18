import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // table configuration
  controllers: [],
  providers: [],
})
export class UserModule {}
