import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string, @Request() req): Promise<any> {
    console.log(username, password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 403,
        message: '没有该用户',
      });
    }
    return user;
  }
}
