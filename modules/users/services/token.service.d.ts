/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose/types/Error" />
import { Model } from 'mongoose';
import { TokenDocument } from '../schema/token.schema';
export declare class TokenService {
    private tokenModel;
    constructor(tokenModel: Model<TokenDocument>);
    getAllToken(findOptions: any): Promise<TokenDocument[]>;
    getOneToken(findOptions: any): Promise<TokenDocument>;
    addOneToken(options: any): Promise<import("mongoose").Document<unknown, any, TokenDocument> & import("../schema/token.schema").Token & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateOneToken(findOptions: any, updateOption: any): Promise<import("mongodb").UpdateResult>;
    deleteOneToken(findOptions: any): Promise<import("mongoose").Document<unknown, any, TokenDocument> & import("../schema/token.schema").Token & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
