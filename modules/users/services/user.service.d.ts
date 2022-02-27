import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(userFindOptions: any, hasPassword?: boolean): Promise<User>;
    createOne(createOptions: any): Promise<User>;
    findAll(): Promise<User[]>;
    userCount(): Promise<number>;
    deleteOne(deleteOptions: any): Promise<import("mongodb").DeleteResult>;
    updateOne(findOptions: any, updateOptions: any): Promise<import("mongodb").UpdateResult>;
}
