import * as mongoose from 'mongoose';
import { IspeakTagDocument } from '../schema/ipseakTag.schema';
export declare class IspeakTagService {
    private ispeakTagModal;
    constructor(ispeakTagModal: mongoose.Model<IspeakTagDocument>);
    createOneTag(name: any, bgColor: string, other: mongoose.RootQuerySelector<IspeakTagDocument>): Promise<import("../schema/ipseakTag.schema").IspeakTag & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    findOneTag(options: mongoose.RootQuerySelector<IspeakTagDocument>): Promise<import("../schema/ipseakTag.schema").IspeakTag & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    getTagList(options?: any): Promise<(import("../schema/ipseakTag.schema").IspeakTag & mongoose.Document<any, any, any> & {
        _id: any;
    })[]>;
    findIspeakTagByPage(page?: number, limit?: number, findOption?: any): Promise<any>;
    findOneIspeakTagUpdate(findOptions: any, updateOptions: any): Promise<import("mongodb").UpdateResult>;
}
