import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { UserModelName } from 'src/constant/model-name';

export type TokenDocument = Token & Document;

@Schema({ timestamps: true })
export class Token {
  /**
   * token标题
   */
  @IsNotEmpty({ message: '请为token添加标题哦！' })
  @Prop({ type: String, required: true })
  title: string;
  /**
   * token标题
   */
  @IsNotEmpty({ message: '请填写token的值' })
  @Prop({ type: String, required: true })
  value: string;
  /**
   * 创建人
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModelName.User, required: true })
  user: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
