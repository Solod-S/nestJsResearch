import { E_Gender } from '../types';
import {
  IsEmail,
  IsString,
  IsISO8601,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';

export class updateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  nameFirst: string;

  @IsString()
  @MinLength(1)
  nameLast: string;

  @IsISO8601()
  birthDate: Date;

  @IsNotEmpty()
  @IsEnum(E_Gender)
  gender: E_Gender;
}
