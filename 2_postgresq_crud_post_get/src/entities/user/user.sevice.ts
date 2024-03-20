import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    // userRepository некая обстракция сервера
  }
  //  Register user
  public async createUser(userData: any) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(userData.password, salt);
    const newUser = this.userRepository.create(userData);
    // создаем обьект пользователя
    const result = await this.userRepository.save({
      ...newUser,
      password: hashedPassword,
    });
    // сохраняем в базу
    return result;
  }
  //  Get user data
  public async getUserData(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    // найди пользователя где id равен параметру
    console.log(`user`, user);
    return user;
  }
}
