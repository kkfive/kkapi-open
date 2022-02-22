import { HttpService } from '@nestjs/axios';
import { Controller, Get, Logger, Post, Query, Request, UseGuards, Body } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { OauthService } from './services/oauth.service';
import { NoAuth } from 'src/common/decorator/customize';
import { User } from './schema/user.schema';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly oauthService: OauthService,
  ) {}

  @Get('/')
  async getUserList(): Promise<SuccessModal> {
    const res = await this.userService.findAll();
    return new SuccessModal(res);
  }
  /**
   * 获取用户jwt中的userId
   * @returns
   */
  @Get('/id')
  async userGetId(@Request() req): Promise<SuccessModal> {
    return new SuccessModal({ id: req.user.userId });
  }

  @NoAuth()
  @Post('init')
  async initUser(@Body() body, @Request() req) {
    const users = await this.userService.findAll();
    if (users.length > 0) {
      return new ErrorModal(null, '存在用户，初始化失败');
    } else {
      const user = await this.userService.createOne({
        userName: body.userName,
      });

      return new SuccessModal(user);
    }
  }

  @NoAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Request() req): Promise<SuccessModal> {
    // return new SuccessModal(await this.authService.login(req.user));
    const token = await this.authService.login(req.user);
    const res = {
      token,
      userId: req.user._id,
      userName: req.user.userName,
    };
    return new SuccessModal(res, '登录成功');
  }

  @Get('getUserInfo')
  async getUserInfo(@Request() req): Promise<SuccessModal> {
    const user = await this.userService.findOne({ _id: req.user.userId });

    const res = {
      token: req.headers.authorization,
      ...user.toObject(),
    };
    return new SuccessModal(res);
  }
}
