import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ISpeakModelName, UserModelName } from 'src/constant/model-name';
import { IspeakTagDocument } from '../schema/ipseakTag.schema';

@Injectable()
export class IspeakTagService {
  constructor(
    @InjectModel(ISpeakModelName.ISpeakTagList)
    private ispeakTagModal: mongoose.Model<IspeakTagDocument>,
  ) {}
  /**
   * 创建标签
   */
  async createOneTag(
    name,
    bgColor = '#DB2828',
    other: mongoose.RootQuerySelector<IspeakTagDocument>,
  ) {
    return this.ispeakTagModal.create({
      name,
      bgColor,
      ...other,
    });
  }
  /**
   * 查找标签
   */
  async findOneTag(options: mongoose.RootQuerySelector<IspeakTagDocument>) {
    return this.ispeakTagModal.findOne(options).exec();
  }

  /**
   * 获取全部标签
   */
  async getTagList(options?) {
    return this.ispeakTagModal.find(options).sort({ orderNo: 1 }).limit(100000);
  }

  /**
   * 分页获取标签
   * @returns
   */
  async findIspeakTagByPage(page = 1, limit = 10, findOption: any = {}): Promise<any> {
    const query = [];
    Object.keys(findOption).forEach((item) => {
      if (!findOption[item]) return;
      if (item === 'user') {
        const obj = {};
        obj[item] = findOption[item]
          ? new mongoose.Types.ObjectId(findOption[item])
          : new RegExp('', 'i');
        query.push(obj);
      } else {
        const obj = {};
        obj[item] = {
          $regex: findOption[item] ? new RegExp(findOption[item], 'i') : new RegExp('', 'i'),
        };
        query.push(obj);
      }
    });
    const match = {};
    if (query.length) {
      match['$and'] = query;
    }
    return this.ispeakTagModal.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: UserModelName.User,
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          bgColor: 1,
          createdAt: 1,
          name: 1,
          orderNo: 1,
          description: 1,
          'user.userName': 1,
          'user.nickName': 1,
          'user.link': 1,
          'user._id': 1,
        },
      },
      {
        $facet: {
          total: [{ $count: 'total' }],
          items: [{ $skip: (page - 1) * limit }, { $sort: { orderNo: 1 } }, { $limit: limit }],
        },
      },
    ]);
  }

  async findOneIspeakTagUpdate(findOptions, updateOptions) {
    return this.ispeakTagModal.updateOne(findOptions, updateOptions).exec();
  }
}
