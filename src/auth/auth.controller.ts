import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/index.dto';
import { UserService } from '../user/user.service';
import { User } from '../utils/user.decorator';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/index.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@User() user: CreateUserDto, @Body() loginUser: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
