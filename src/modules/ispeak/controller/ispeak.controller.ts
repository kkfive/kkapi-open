import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { IsLogin, NoAuth } from 'src/common/decorator/customize';
import { TokenName } from 'src/constant/token-name';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { TokenService } from 'src/modules/users/services/token.service';
import { Ispeak } from '../schema/ispeak.schema';
import { IspeakService } from '../service/ispeak.service';

@Controller('/ispeak')
export class IspeakController {
  constructor(
    private readonly ispeakService: IspeakService,
    private readonly tokenService: TokenService,
  ) {}

  @IsLogin()
  @Get('/')
  async getSpeakByPage(@Request() req, @Query() query) {
    const { author } = query;
    let { page = 1, pageSize = 10 } = query;
    if (!author) return new ErrorModal(null, '需要指定查询的用户');
    const type = ['0', '1'];
    if (req?.user?.userId && req?.user?.userId === author) {
      type.push('2');
    }
    try {
      page = Number(page);
      pageSize = Number(pageSize);
    } catch (error) {
      return new ErrorModal(null, '请传入正确的参数');
    }
    const result = await this.ispeakService.getSpeakByPage(page, pageSize, {
      author,
      type,
    });
    const returnObj = {
      total: 0,
      items: [],
      isLogin: req.user && req.user.userId ? req.user.userId : null,
    };
    result.forEach((res) => {
      returnObj.total = res.total ? res.total[0]?.total : 0;
      res.items.forEach((item) => {
        item.author = item.author
          ? {
              nickName: item.author[0].nickName,
              avatar: item.author[0].avatar,
            }
          : { nickName: '', avatar: '' };
        item.tag = item.tag ? item.tag[0] : {};
        if (item.type === '0') {
          returnObj.items.push(item);
        } else if (item.type === '1') {
          if (req.user && req.user.userId) {
            returnObj.items.push(item);
          } else {
            returnObj.items.push({
              _id: item._id,
              updatedAt: item.updatedAt,
              createdAt: item.createdAt,
              author: item.author,
              type: '1',
              content: '该内容需登录后查看',
              title: '',
            });
          }
        } else if (item.type === '2') {
          if (req.user && req.user.userId && req.user.userId === author) {
            returnObj.items.push(item);
          } else {
            returnObj.items.push({
              _id: item._id,
              updatedAt: item.updatedAt,
              createdAt: item.createdAt,
              type: '2',
              content: '该内容仅作者可见',
              title: '',
            });
          }
        }
      });
    });

    return new SuccessModal(returnObj);
  }

  @Get('/getByPage')
  async getIspeakByPage(@Query() query, @Request() req) {
    const { page, pageSize, _t, ...otherQuery } = query;
    const queryOptions = otherQuery;
    queryOptions['author'] = queryOptions.author || req.user.userId;

    const result = await this.ispeakService.getSpeakByPage(
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
  async addOneSpeak(@Request() req, @Body() body: Ispeak) {
    const userId = req.user.userId;
    const { title, content, type, tag } = body;
    const result = await this.ispeakService.addOneSpeak({
      title,
      content,
      type,
      tag,
      author: userId,
    });
    return new SuccessModal(result);
  }

  @NoAuth()
  @Post('/addByToken')
  async addOneSpeakByToken(@Body() body: Ispeak) {
    const { title, content, type, tag, showComment } = body;
    const token = body['token'];
    const user = await this.tokenService.getOneToken({ title: TokenName.Speak, value: token });
    if (!user) return new ErrorModal(null, '此token不存在');
    if (!isValidObjectId(tag)) return new ErrorModal(null, '请传入标签的id');
    const result = await this.ispeakService.addOneSpeak({
      title,
      content,
      type,
      tag,
      showComment,
      author: user.user,
    });
    return new SuccessModal(result);
  }

  @Patch('/update')
  async updateSpeak(@Body() body, @Request() req) {
    // eslint-disable-next-line prefer-const
    let { _id, ...updateData } = body;
    const updateAuthor = req.user.userId;

    const res = await this.ispeakService.findOneAndUpdate(
      { _id, author: updateAuthor },
      updateData,
    );

    if (res.acknowledged && res.modifiedCount === 1) {
      return new SuccessModal(res, '更新成功');
    } else {
      if (res.matchedCount === 0) {
        return new ErrorModal(res, '没有找到对应speak');
      } else {
        return new ErrorModal(res, '更新失败');
      }
    }
  }

  @Patch('/status/')
  async updateSpeakStatus(@Body() body, @Request() req) {
    // eslint-disable-next-line prefer-const
    let { _id, showComment } = body;
    const updateAuthor = req.user.userId;
    const result = await this.ispeakService.findOneAndUpdate(
      { _id, author: updateAuthor },
      { showComment },
    );
    if (result.acknowledged && result.modifiedCount === 1) {
      return new SuccessModal(result, '更新成功');
    } else {
      if (result.matchedCount === 0) {
        return new ErrorModal(result, '没有找到对应speak');
      } else {
        return new ErrorModal(result, '更新失败');
      }
    }
  }

  @Delete('/:id')
  async deleteOneSpeak(@Param() param) {
    if (!param.id || !isValidObjectId(param?.id)) return new ErrorModal(null, 'id不合法');
    const res = await this.ispeakService.findOneAndDelete({ _id: param.id });
    return new SuccessModal(res);
  }

  @NoAuth()
  @Get('/get/:id')
  async getOneSpeak1(@Param() param) {
    const res = await this.ispeakService.findOne({ _id: param.id });
    return new SuccessModal(res.length ? res[0] : []);
  }
}
