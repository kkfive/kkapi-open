import * as mongoose from 'mongoose';
export declare class User extends mongoose.Document {
    userName: string;
    nickName: string;
    avatar: string;
    desc: string;
    link: string;
    email: string;
    password: string;
    homePath: string;
    status: string;
    speakToken: string;
    githubId: string;
}
export declare type UserDocument = User & mongoose.Document;
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any>, any, any>;
