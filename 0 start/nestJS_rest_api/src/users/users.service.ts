import { Injectable } from '@nestjs/common';
import { CityService } from 'src/city/city.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly CityService: CityService) {}
  async getUsers() {
    const data = [
      new UserDto({
        age: 21,
        name: 'Alex',
        hasPassport: true,
        city: await this.CityService.getCityByTitle('lol'),
      }),
    ];
    return data;
  }
}
