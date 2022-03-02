import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { ISpeakModelName, UserModelName } from 'src/constant/model-name';
import { IspeakTag } from './ipseakTag.schema';

export type IspeakDocument = Ispeak & Document;

@Schema({ timestamps: true })
export class Ispeak {
  /**
   * 标题
   */
  @Prop({ type: String, default: '' })
  title: string;

  /**
   * 内容
   */
  @IsNotEmpty({ message: '内容为必填项目哦！' })
  @Prop({ type: String, required: true })
  content: string;
  /**
   * 类型 0全部人可见 1仅登录可见 2仅自己可见
   */
  @Prop({ type: String, default: '0' })
  type: string;

  @IsNotEmpty({
    message: '标签为必填项目',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ISpeakModelName.ISpeakTagList,
    required: true,
  })
  tag: IspeakTag;

  /**
   * 展示评论可被评论 0不可以被评论 1可以被评论
   */
  @Prop({ type: String, default: '1' })
  showComment: string;

  /**
   * 创建人
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModelName.User, required: true })
  author: string;

  @Prop()
  updatedAt: Date;
  @Prop()
  createdAt: Date;
}

export const IspeakSchema = SchemaFactory.createForClass(Ispeak);
