import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User extends mongoose.Document {
  @Prop()
  userName: string; // 用户名
  @Prop()
  nickName: string; // 昵称
  @Prop()
  realName: string; // 真实姓名

  @Prop()
  avatar: string; // 头像

  @Prop()
  desc: string; // 描述

  @Prop()
  link: string; // 个人链接

  @Prop()
  email: string; // 邮箱

  @Prop({ select: false, default: '$2a$10$TVk79hQVVpmfu2BOupaIl.lw80Wlwvnpwl0oOjjLH180fi16F9p0K' })
  password: string; // 密码

  @Prop({ default: '/dashboard/analysis' })
  homePath: string; // 首页路径

  @Prop()
  remark: string; // 备注

  @Prop({ default: '0' })
  status: string; // 状态

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RolesList' })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [String] })
  permCode: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Departments' })
  deptId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: '', type: String })
  speakToken: string;

  @Prop({ default: '' })
  giteeId: string;

  @Prop({ default: '' })
  githubId: string;

  @Prop({ default: Date.now() })
  createTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
