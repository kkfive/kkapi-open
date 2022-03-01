import { Model } from 'mongoose';
import { Post, PostDocument } from '../schema/post.schema';
export declare class PostService {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    createOne(createOptions: any): Promise<Post>;
    findAll(): Promise<Post[]>;
    userCount(): Promise<number>;
    deleteOne(deleteOptions: any): Promise<import("mongodb").DeleteResult>;
}
