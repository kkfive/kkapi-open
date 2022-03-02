import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Post {
  /**
   * 文章标题
   */
  @Prop()
  title: string;

  /**
   * 文章连接
   */
  @Prop()
  link: string;

  /**
   * 作者名称
   */
  @Prop()
  author: string;

  /**
   * 作者头像
   */
  @Prop()
  avatar: string;

  /**
   * 爬虫规则
   */
  @Prop()
  rule: string;

  /**
   * 文章更新时间
   */
  @Prop()
  updated: Date;

  /**
   * 文章创建时间
   */
  @Prop()
  created: Date;

  /**
   * 当前记录创建创建时间
   */
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = Post & mongoose.Document;
