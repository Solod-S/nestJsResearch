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
  availableFields = ['email', 'nameFirst', 'nameLast', 'birthDate', 'gender'];
  // helper
  private filterFields(body: { [k: string]: any }) {
    // body: { [k: string]: any } - обьект с различными значениями

    const filteredBody: { [k: string]: any } = {};

    Object.keys(body).filter((k) => {
      if (this.availableFields.includes(k)) {
        filteredBody[k] = body[k];
      }
    });
    // отфильтровка не нужных полей
    return filteredBody;
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

  //  Update user data whole
  public async updateUser(id: number, body: any) {
    // const { email, nameFirst, nameLast, birthDate, gender } = body;
    const newUser = await this.userRepository.update(
      { id },
      // { email, nameFirst, nameLast, birthDate, gender },
      this.filterFields(body),
    );
    return newUser;
  }
  //  Get all users data
  public async getAllUsersData() {
    const users = await this.userRepository.find({
      select: ['id', 'email', 'nameFirst', 'nameLast', 'birthDate', 'gender'],
    });
    return users;
  }

  //  Get user data
  public async getUserData(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    // найди пользователя где id равен параметру
    console.log(`user`, user);
    return user;
  }
}
