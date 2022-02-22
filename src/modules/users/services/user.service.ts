import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  /**
   * 查找用户
   */
  async findOne(userFindOptions: any, hasPassword = false): Promise<User> {
    if (hasPassword) {
      return this.userModel.findOne(userFindOptions).populate('password');
    } else {
      return this.userModel.findOne(userFindOptions);
    }
  }

  async createOne(createOptions: any): Promise<User> {
    return this.userModel.create({
      ...createOptions,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * 获取当前用户数量
   */
  async userCount(): Promise<number> {
    return this.userModel.estimatedDocumentCount().exec();
  }

  async deleteOne(deleteOptions) {
    return this.userModel.deleteOne(deleteOptions);
  }
}
