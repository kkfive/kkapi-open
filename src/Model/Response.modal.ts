type ResType = 'success' | 'error' | 'warning';
type ResCode = number;
type ResMessage = string;
class ResponseModal {
  data: any;
  message: ResMessage;
  type: ResType;
  code: ResCode;
  constructor(data: any) {
    this.data = data;
  }
  success(message: ResMessage, type: ResType = 'success') {
    this.code = 200;
    this.message = message;
    this.type = type;
    return this;
  }
  error(message, code: ResCode = -1) {
    this.message = message;
    this.code = code;
    this.type = 'error';
    return this;
  }
}

export class SuccessModal extends ResponseModal {
  constructor(data, message: ResMessage = '请求成功', type: ResType = 'success') {
    super(data);
    this.code = 0;
    this.message = message;
    this.type = type;
  }
}

export class ErrorModal extends ResponseModal {
  constructor(data, message: ResMessage, code: ResCode = -1) {
    super(data);
    this.code = code;
    this.message = message;
    this.type = 'error';
  }
}
