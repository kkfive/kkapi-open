import * as mongoose from 'mongoose';
export declare type IspeakTagDocument = IspeakTag & mongoose.Document;
export declare class IspeakTag {
    name: string;
    bgColor: string;
    user: mongoose.Schema.Types.ObjectId;
    orderNo: number;
    description: string;
}
export declare const IspeakTagSchema: mongoose.Schema<mongoose.Document<IspeakTag, any, any>, mongoose.Model<mongoose.Document<IspeakTag, any, any>, any, any, any>, any, any>;
