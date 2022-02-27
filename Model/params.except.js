"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsLostException = void 0;
const common_1 = require("@nestjs/common");
class ParamsLostException extends common_1.HttpException {
    constructor(objectOrError, description, status = 200) {
        super(common_1.HttpException.createBody(objectOrError, description, -1), status);
        this.message = description;
        this.getStatus();
    }
}
exports.ParamsLostException = ParamsLostException;
//# sourceMappingURL=params.except.js.map