import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator';

import { CityDto } from '../../city/dto/city.dto';

export class UserDto {
  @ApiProperty({ type: 'integer' })
  age: number;
  @ApiProperty({ type: 'string' })
  name: string;
  @ApiProperty({ type: 'boolean' })
  hasPassport: boolean;
  @ApiPropertyOptional({ type: CityDto })
  city?: CityDto;

  // get yearsBeforeDie() {
  //   return 100 - this.age;
  // }

  constructor({ age, name, city, hasPassport }: UserDto) {
    this.age = age;
    this.name = name;
    this.city = city;
    this.hasPassport = hasPassport;
  }
}
