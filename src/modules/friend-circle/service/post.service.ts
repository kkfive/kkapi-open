import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schema/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}

  /**
   * 创建一篇文章
   */
  async createOne(createOptions: any): Promise<Post> {
    return this.postModel.create({
      ...createOptions,
    });
  }

  /**
   * 查找全部文章
   */
  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  /**
   * 获取当前文章总量
   */
  async userCount(): Promise<number> {
    return this.postModel.estimatedDocumentCount().exec();
  }

  /**
   * 删除一篇文章
   */
  async deleteOne(deleteOptions) {
    return this.postModel.deleteOne(deleteOptions);
  }
}
