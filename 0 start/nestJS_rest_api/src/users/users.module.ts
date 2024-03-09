import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [CityModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
