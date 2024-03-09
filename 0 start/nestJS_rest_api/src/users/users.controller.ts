import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(readonly UsersService: UsersService) {}
  // GET --> /users/ --> users list
  @Get('/')
  @ApiResponse({ type: [UserDto] })
  async getUsers(): Promise<UserDto[]> {
    // Реализация обработки GET-запроса на путь '/'
    return this.UsersService.getUsers();
  }
}
