import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [UsersModule, CityModule],
  // controllers: [AppController],
  // providers: [AppService],
  controllers: [],
  providers: [],
})
export class AppModule {}
