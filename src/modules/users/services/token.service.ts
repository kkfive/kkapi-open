import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { UserModelName } from '../../../constant/model-name';
import { TokenDocument } from '../schema/token.schema';

@Injectable()
export class TokenService {
  constructor(@InjectModel(UserModelName.Token) private tokenModel: Model<TokenDocument>) {}
  async getAllToken(findOptions): Promise<TokenDocument[]> {
    return this.tokenModel.find(findOptions);
  }
  async getOneToken(findOptions): Promise<TokenDocument> {
    return this.tokenModel.findOne(findOptions);
  }
  async addOneToken(options) {
    return this.tokenModel.create(options);
  }
  async updateOneToken(findOptions, updateOption) {
    return this.tokenModel.updateOne(findOptions, updateOption);
  }
  async deleteOneToken(findOptions) {
    return this.tokenModel.findOneAndDelete(findOptions);
  }
}
