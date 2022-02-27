"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModal = exports.SuccessModal = void 0;
class ResponseModal {
    data;
    message;
    type;
    code;
    constructor(data) {
        this.data = data;
    }
    success(message, type = 'success') {
        this.code = 200;
        this.message = message;
        this.type = type;
        return this;
    }
    error(message, code = -1) {
        this.message = message;
        this.code = code;
        this.type = 'error';
        return this;
    }
}
class SuccessModal extends ResponseModal {
    constructor(data, message = '请求成功', type = 'success') {
        super(data);
        this.code = 0;
        this.message = message;
        this.type = type;
    }
}
exports.SuccessModal = SuccessModal;
class ErrorModal extends ResponseModal {
    constructor(data, message, code = -1) {
        super(data);
        this.code = code;
        this.message = message;
        this.type = 'error';
    }
}
exports.ErrorModal = ErrorModal;
//# sourceMappingURL=Response.modal.js.map