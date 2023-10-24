import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatedResponse } from '../utils';
import { encodePassword } from '../utils/bcrypt';
import { EmailExists, SuccessRegister } from '../utils/message';
import { CreateUserDto } from './dto/index.dto';
import { UserDocument } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async getDetailUser(user: CreateUserDto) {
    delete user.password;
    return {
      data: formatedResponse(user),
    };
  }

  async findUserByEmail(email: string) {
    return await this.UserModel.findOne({ email }).lean();
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user) {
      throw new HttpException(EmailExists, HttpStatus.BAD_REQUEST);
    }
    const password = encodePassword(createUserDto.password);
    await this.UserModel.create({ ...createUserDto, password });
    return {
      statusCode: HttpStatus.CREATED,
      message: SuccessRegister,
    };
  }
}
