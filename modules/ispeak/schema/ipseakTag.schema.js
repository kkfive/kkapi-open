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
exports.IspeakTagSchema = exports.IspeakTag = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let IspeakTag = class IspeakTag {
    name;
    bgColor;
    user;
    orderNo;
    description;
};
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '标签名称为必填项' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IspeakTag.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#DB2828' }),
    __metadata("design:type", String)
], IspeakTag.prototype, "bgColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: model_name_1.UserModelName.User }),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], IspeakTag.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], IspeakTag.prototype, "orderNo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], IspeakTag.prototype, "description", void 0);
IspeakTag = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], IspeakTag);
exports.IspeakTag = IspeakTag;
exports.IspeakTagSchema = mongoose_1.SchemaFactory.createForClass(IspeakTag);
//# sourceMappingURL=ipseakTag.schema.js.map