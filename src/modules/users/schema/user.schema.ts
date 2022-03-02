import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop({ default: '' })
  userName: string; // 用户名
  @Prop({ default: '' })
  nickName: string; // 昵称

  @Prop({ default: '' })
  avatar: string; // 头像

  @Prop({ default: '' })
  desc: string; // 描述

  @Prop({ default: '' })
  link: string; // 个人链接

  @Prop({ default: '' })
  email: string; // 邮箱

  @Prop({ select: false, default: '$2a$10$TVk79hQVVpmfu2BOupaIl.lw80Wlwvnpwl0oOjjLH180fi16F9p0K' })
  password: string; // 密码

  @Prop({ default: '/about/index' })
  homePath: string; // 首页路径

  @Prop({ default: '0' })
  status: string; // 状态

  @Prop({ default: '', type: String })
  speakToken: string;

  @Prop({ default: '' })
  githubId: string;
}
export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
