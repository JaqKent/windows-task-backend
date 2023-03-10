import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { EditUserDto } from 'src/dto/edit-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';

import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async editUser(id: string, editUserDto: EditUserDto) {
    return this.userModel.findByIdAndUpdate(id, editUserDto, { new: true });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !user.validatePassword(password)) {
      throw new Error('Credenciales invalidas');
    }
    return user.generateToken();
  }

  async logoutUser(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { token: null });
  }

  async checkUser() {
    const user = await this.userModel.findOne({ token }).exec();
    if (!user) {
      throw new Error('Token invalido');
    }
    return user;
  }
}
