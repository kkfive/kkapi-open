import { Injectable } from '@nestjs/common';
import { UserService } from '../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/schema/user.schema';
import { bcryptValidate } from 'src/common/encription';
export interface payloadType {
  userName: string;
  _id: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await (await this.usersService.findOne({ userName: username }, true))?.toObject();

    if (user && bcryptValidate(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: payloadType | User) {
    const payload = {
      userName: user.userName,
      userId: user._id,
    };
    return this.jwtService.sign(payload);
  }
}
