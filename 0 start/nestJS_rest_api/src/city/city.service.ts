import { Injectable } from '@nestjs/common';
import { CityDto } from 'src/city/dto/city.dto';

@Injectable()
export class CityService {
  async getCityByTitle(title: string) {
    return new CityDto({ title: 'Kiev' });
  }
}
