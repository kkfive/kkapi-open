import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { UserModelName } from 'src/constant/model-name';

export type IspeakTagDocument = IspeakTag & mongoose.Document;

@Schema({ timestamps: true })
export class IspeakTag {
  /**
   * 标签名称
   */
  @IsNotEmpty({ message: '标签名称为必填项' })
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
}

export const IspeakTagSchema = SchemaFactory.createForClass(IspeakTag);
