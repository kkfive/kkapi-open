import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ISpeakModelName, UserModelName } from 'src/constant/model-name';
import { IspeakDocument, Ispeak } from '../schema/ispeak.schema';

@Injectable()
export class IspeakService {
  constructor(
    @InjectModel(ISpeakModelName.ISpeakList) private IspeakModel: mongoose.Model<IspeakDocument>,
  ) {}

  async getSpeakByPage(page = 1, limit = 10, findOption: any = {}) {
    const query = [];
    const queryType = [];
    Object.keys(findOption).forEach((item) => {
      if (!findOption[item]) return;
      if (item === 'author' || item === 'tag') {
        const obj = {};
        obj[item] = findOption[item]
          ? new mongoose.Types.ObjectId(findOption[item])
          : new RegExp('', 'i');
        query.push(obj);
      } else if (item === 'type') {
        if (!Array.isArray(findOption[item])) {
          findOption[item] = [findOption[item]];
        }
        findOption[item].forEach((value) => {
          const obj = {};
          obj['type'] = {
            $regex: value ? new RegExp(value, 'i') : new RegExp('', 'i'),
          };
          queryType.push(obj);
        });
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
    if (queryType.length) {
      match['$or'] = queryType;
    }
    return this.IspeakModel.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: ISpeakModelName.ISpeakTagList,
          localField: 'tag',
          foreignField: '_id',
          as: 'tag',
        },
      },
      {
        $lookup: {
          from: UserModelName.User,
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $project: {
          _id: 1,
          updatedAt: 1,
          createdAt: 1,
          type: 1,
          content: 1,
          title: 1,
          tag: 1,
          author: 1,
          showComment: 1,
        },
      },
      {
        $facet: {
          total: [{ $count: 'total' }],
          items: [{ $sort: { createdAt: -1 } }, { $skip: (page - 1) * limit }, { $limit: limit }],
        },
      },
    ]);
  }

  async addOneSpeak(createOption) {
    return this.IspeakModel.create(createOption);
  }
  /**
   * 查找一个speak并更新
   * @param findOptions 查找条件
   * @param updateOptions 更新内容
   * @returns
   */
  async findOneAndUpdate(
    findOptions: mongoose.RootQuerySelector<IspeakDocument>,
    updateOptions: mongoose.RootQuerySelector<IspeakDocument>,
  ) {
    return this.IspeakModel.updateOne(findOptions, updateOptions).exec();
  }

  async findOneAndDelete(findOptions: mongoose.RootQuerySelector<IspeakDocument>) {
    return this.IspeakModel.findOneAndRemove(findOptions);
  }

  async findOne(findOption: mongoose.RootQuerySelector<IspeakDocument>) {
    return this.IspeakModel.find(findOption);
  }
}
