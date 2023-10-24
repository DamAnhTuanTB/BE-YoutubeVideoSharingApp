import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../utils/bcrypt';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userDB = await this.userService.findUserByEmail(email);
    if (userDB) {
      const matched = comparePassword(password, userDB.password);
      if (matched) {
        return userDB;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  async login(user: any) {
    const payload = { email: user.email, _id: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
