import { ApiProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiProperty({ title: 'string' })
  title: string;

  constructor({ title }: CityDto) {
    this.title = title;
  }
}
