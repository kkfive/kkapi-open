import * as mongoose from 'mongoose';
export declare type TokenDocument = Token & Document;
export declare class Token {
    title: string;
    value: string;
    user: string;
    createAt: Date;
}
export declare const TokenSchema: mongoose.Schema<mongoose.Document<Token, any, any>, mongoose.Model<mongoose.Document<Token, any, any>, any, any, any>, any, any>;
