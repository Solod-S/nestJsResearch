import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Req,
  Res,
  Param,
  Body,
  UseInterceptors,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { UserService } from './user.sevice';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('users')
// @Controller({ path: 'users', host: 'test.com' })
// контролер будет срабатывато только у кого в заголовке хост равен тому что мы указали
// @Controller({ path: 'users', host: ':account.test.com' })
//  :account - плейсхолдер (переменная) дальше можем извлекат с помощью
// @HostParam("account") account: string
export class UserController {
  constructor(private readonly userService: UserService) {} // private readonly userService: UserService

  //  Get all users
  // @Get('/')
  // async getAllUsers(@Res() res: Response, @Req() req: Request) {
  //   const users = await this.userService.getAllUsersData();
  //   res.send({ status: 'ok', data: users });
  // }

  @Get('/')
  @HttpCode(200)
  async getAllUsers(@Res({ passthrough: true }) res: Response) {
    const users = await this.userService.getAllUsersData();
    return { status: 'ok', data: users };
  }

  //  Get by id
  @Get('/:id')
  async getUser(
    @Res() res: Response,
    // @Param() params: { [k: string]: any },
    // ключем может быть строка и значение любое
    @Param('id', ParseIntPipe) id: number,
    //  ParseIntPipe преобразовывает к числу
    @Req() req: Request,
  ) {
    const newUseData = await this.userService.getUserData(id);

    // delete newUseData.password;
    // удаялем пароль
    return res.send({ status: 'ok', data: { newUseData } });
  }

  //  Create user
  @Post('/')
  @UseInterceptors(FileInterceptor(''))
  // для получения formData в теле запроса
  async createUser(@Res() res: Response, @Req() req: Request) {
    // console.log(req.body);
    const newUseData = await this.userService.createUser(req.body);

    console.log(`newUseData`, newUseData);
    return res.send({ status: 'ok' });
  }

  // Update user data
  @Put('/:id')
  async updateUser(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Req() req: Request,
  ) {
    await this.userService.updateUser(id, body);
    // delete user.password;
    res.send({ status: 'ok' });
  }

  // Update user field
  @Patch('/:id')
  async updateUserField(@Res() res: Response, @Req() req: Request) {}

  // Delete user
  @Delete('/:id')
  async deleteUser(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.userService.deleteUser(id);
    res.send({ status: 'ok' });
  }
}
