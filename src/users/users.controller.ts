import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { EditUserDto } from 'src/dto/edit-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/user-service/user-service.service';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put('/edit/:id')
  @UseGuards(AuthGuard('jwt'))
  async editUser(@Param('id') id: string, @Body() editUserDto: EditUserDto) {
    return this.usersService.editUser(id, editUserDto);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post('/auth/login')
  async loginUser(@Body() credentials: LoginUserDto) {
    return this.usersService.loginUser(credentials);
  }

  @Post('/auth/logout')
  @UseGuards(AuthGuard('jwt'))
  async logoutUser(@Req() request: any) {
    const userId = request.user.id;
    return this.usersService.logoutUser(userId);
  }

  @Get('/auth/check')
  @UseGuards(AuthGuard('jwt'))
  async checkUser() {
    return this.usersService.checkUser();
  }
}
