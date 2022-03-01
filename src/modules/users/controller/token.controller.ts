import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Request,
  UseGuards,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';

import { TokenService } from '../services/token.service';

@Controller('/user/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/')
  async getUserTokenList(@Request() req): Promise<SuccessModal> {
    const res = await this.tokenService.getAllToken({ user: req.user.userId });
    return new SuccessModal(res);
  }
  @Post('add')
  async addUserToken(@Request() req, @Body() body) {
    const { title, value } = body;
    const titleExits = await this.tokenService.getAllToken({ title, user: req.user.userId });
    if (titleExits.length !== 0) {
      return new ErrorModal(null, '当前token已存在');
    } else {
      const result = await this.tokenService.addOneToken({ user: req.user.userId, title, value });
      return new SuccessModal(result);
    }
  }
  @Patch('update')
  async updateUserToken(@Request() req, @Body() body) {
    const { title, value, _id } = body;
    const tokenExit = await this.tokenService.getAllToken({ user: req.user.userId, _id });
    if (tokenExit.length !== 0) {
      const updateResult = await this.tokenService.updateOneToken(
        { user: req.user.userId, _id: body._id },
        { title, value },
      );
      if (updateResult.acknowledged && updateResult.modifiedCount === 1) {
        return new SuccessModal(updateResult, '更新成功');
      } else {
        if (updateResult.matchedCount === 0) {
          return new ErrorModal(updateResult, '没有找到对应token');
        } else {
          return new ErrorModal(updateResult, '更新失败');
        }
      }
    }
  }
  @Delete('delete/:id')
  async deleteUserToken(@Request() req, @Param() param) {
    const deleteResult = await this.tokenService.deleteOneToken({
      user: req.user.userId,
      _id: param.id,
    });
    return new SuccessModal(deleteResult);
  }
}
