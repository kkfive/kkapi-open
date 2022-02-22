import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserModelName } from 'src/constant/model-name';

export type IspeakTagDocument = IspeakTag & mongoose.Document;

@Schema()
export class IspeakTag {
  /**
   * 标签名称
   */
  @Prop({ required: true })
  name: string;

  /**
   * 标签背景颜色
   */
  @Prop({ default: '#DB2828' })
  bgColor: string;

  /**
   * 创建用户
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModelName.User })
  user: mongoose.Schema.Types.ObjectId;

  /**
   * 排序
   */
  @Prop({ default: 0 })
  orderNo: number;

  /**
   * 标签描述
   */
  @Prop({ default: '' })
  description: string;

  /**
   * 创建时间
   */
  @Prop({ type: Date, default: Date.now() })
  createAt: Date;
}

export const IspeakTagSchema = SchemaFactory.createForClass(IspeakTag);
