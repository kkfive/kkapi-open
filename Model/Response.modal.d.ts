declare type ResType = 'success' | 'error' | 'warning';
declare type ResCode = number;
declare type ResMessage = string;
declare class ResponseModal {
    data: any;
    message: ResMessage;
    type: ResType;
    code: ResCode;
    constructor(data: any);
    success(message: ResMessage, type?: ResType): this;
    error(message: any, code?: ResCode): this;
}
export declare class SuccessModal extends ResponseModal {
    constructor(data: any, message?: ResMessage, type?: ResType);
}
export declare class ErrorModal extends ResponseModal {
    constructor(data: any, message: ResMessage, code?: ResCode);
}
export {};
