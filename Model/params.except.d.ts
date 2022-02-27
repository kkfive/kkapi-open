import { HttpException } from '@nestjs/common';
export declare class ParamsLostException extends HttpException {
    constructor(objectOrError?: string | object | any, description?: string, status?: number);
}
