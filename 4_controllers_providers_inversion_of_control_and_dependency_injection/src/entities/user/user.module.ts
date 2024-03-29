import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.sevice';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // table configuration
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
