import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { IsLogin, NoAuth } from 'src/common/decorator/customize';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { IspeakTagService } from '../service/ispeakTag.service';
@Controller('/ispeak/tag')
export class IspeakTagController {
  constructor(private readonly ispeakService: IspeakTagService) {}

  @Get('/')
  async getAllTag(@Query() query, @Request() req): Promise<SuccessModal | ErrorModal> {
    const otherQuery = {};
    const urerId = query.userId || req.user.userId;
    if (urerId) {
      if (!isValidObjectId(urerId)) return new SuccessModal([]);
      otherQuery['user'] = urerId;
      const res = await this.ispeakService.getTagList(otherQuery);
      return new SuccessModal(res);
    } else {
      return new SuccessModal([]);
    }
  }
  @NoAuth()
  @Get('/list')
  async getTagsByUserId(@Query() query) {
    const otherQuery = {};
    const urerId = query.userId;
    if (urerId) {
      if (!isValidObjectId(urerId)) return new SuccessModal([]);
      otherQuery['user'] = urerId;
      const res = await this.ispeakService.getTagList(otherQuery);
      return new SuccessModal(res);
    } else {
      return new SuccessModal([]);
    }
  }

  @Get('/getByPage')
  async getIspeakTagByPage(@Query() query, @Request() req) {
    const { page, pageSize, _t, ...otherQuery } = query;
    const queryOptions = otherQuery;
    otherQuery['user'] = req.user.userId;

    const result = await this.ispeakService.findIspeakTagByPage(
      Number(page),
      Number(pageSize),
      queryOptions,
    );
    const returnObj = {
      total: 0,
      items: [],
    };
    if (result.length > 0) {
      result.forEach((item) => {
        if (item.total.length > 0) {
          returnObj.total += item.total[0].total;
          returnObj.items.push(...item.items);
        }
      });
    }
    return new SuccessModal(returnObj);
  }

  @Post('/add')
  async addTag(@Body() body, @Request() req): Promise<SuccessModal | ErrorModal> {
    const userId = req.user.userId;
    if (!userId) return new ErrorModal(null, '请先登录');
    // if (body.userId) {
    //   userId = body.userId;
    // }

    if (body.name) {
      const tag = await this.ispeakService.findOneTag({
        user: userId,
        name: body.name,
        orderNo: body.orderNo,
        description: body.description,
      });
      if (tag) {
        return new ErrorModal(tag, '标签已存在');
      } else {
        const res = await this.ispeakService.createOneTag(body.name, body.bgColor, {
          user: userId,
          orderNo: body.orderNo || 0,
          description: body.description || '',
        });
        return new SuccessModal(res);
      }
    } else {
      return new ErrorModal(null, '请填写标签名称。');
    }
  }

  @Post('/update')
  async updateIspeakTag(@Body() body) {
    const { _id, ...updateData } = body;
    const res = await this.ispeakService.findOneIspeakTagUpdate({ _id }, updateData);
    if (res.acknowledged && res.modifiedCount === 1) {
      return new SuccessModal(res, '更新成功');
    } else {
      return new ErrorModal(res, '更新失败');
    }
  }
}
