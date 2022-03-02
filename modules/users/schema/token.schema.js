"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = exports.Token = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let Token = class Token {
    title;
    value;
    user;
};
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '请为token添加标题哦！' }),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Token.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '请填写token的值' }),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Token.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: model_name_1.UserModelName.User, required: true }),
    __metadata("design:type", String)
], Token.prototype, "user", void 0);
Token = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Token);
exports.Token = Token;
exports.TokenSchema = mongoose_1.SchemaFactory.createForClass(Token);
//# sourceMappingURL=token.schema.js.map