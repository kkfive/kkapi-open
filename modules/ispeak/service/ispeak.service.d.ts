import * as mongoose from 'mongoose';
import { IspeakDocument, Ispeak } from '../schema/ispeak.schema';
export declare class IspeakService {
    private IspeakModel;
    constructor(IspeakModel: mongoose.Model<IspeakDocument>);
    getSpeakByPage(page?: number, limit?: number, findOption?: any): Promise<any[]>;
    addOneSpeak(createOption: any): Promise<mongoose.Document<unknown, any, IspeakDocument> & Ispeak & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
    findOneAndUpdate(findOptions: mongoose.RootQuerySelector<IspeakDocument>, updateOptions: mongoose.RootQuerySelector<IspeakDocument>): Promise<import("mongodb").UpdateResult>;
    findOneAndDelete(findOptions: mongoose.RootQuerySelector<IspeakDocument>): Promise<mongoose.Document<unknown, any, IspeakDocument> & Ispeak & Document & {
        _id: mongoose.Types.ObjectId;
    }>;
    findOne(findOption: mongoose.RootQuerySelector<IspeakDocument>): Promise<(mongoose.Document<unknown, any, IspeakDocument> & Ispeak & Document & {
        _id: mongoose.Types.ObjectId;
    })[]>;
}
