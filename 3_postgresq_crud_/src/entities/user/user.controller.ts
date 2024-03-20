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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { UserService } from './user.sevice';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {} // private readonly userService: UserService

  @Get('/')
  async getAllUsers(@Res() res: Response, @Req() req: Request) {
    const users = await this.userService.getAllUsersData();
    res.send({ status: 'ok', data: users });
  }

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

    delete newUseData.password;
    // удаялем пароль
    return res.send({ status: 'ok', data: { newUseData } });
  }

  @Post('/')
  @UseInterceptors(FileInterceptor(''))
  // для получения formData в теле запроса
  async createUser(@Res() res: Response, @Req() req: Request) {
    // console.log(req.body);
    const newUseData = await this.userService.createUser(req.body);

    console.log(`newUseData`, newUseData);
    return res.send({ status: 'ok' });
  }

  @Put('/:id')
  async updateUser(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Req() req: Request,
  ) {
    const user = await this.userService.updateUser(id, body);
    // delete user.password;
    res.send({ status: 'ok', data: user });
  }
  @Patch('/:id')
  async updateUserField(@Res() res: Response, @Req() req: Request) {}
  @Delete('/:id')
  async deleteUser(@Res() res: Response, @Req() req: Request) {}
}
