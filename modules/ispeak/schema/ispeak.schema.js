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
exports.IspeakSchema = exports.Ispeak = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
const ipseakTag_schema_1 = require("./ipseakTag.schema");
let Ispeak = class Ispeak {
    title;
    content;
    type;
    tag;
    showComment;
    author;
    updatedAt;
    createdAt;
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], Ispeak.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '内容为必填项目哦！' }),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Ispeak.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '0' }),
    __metadata("design:type", String)
], Ispeak.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: '标签为必填项目',
    }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: model_name_1.ISpeakModelName.ISpeakTagList,
        required: true,
    }),
    __metadata("design:type", ipseakTag_schema_1.IspeakTag)
], Ispeak.prototype, "tag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '1' }),
    __metadata("design:type", String)
], Ispeak.prototype, "showComment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: model_name_1.UserModelName.User, required: true }),
    __metadata("design:type", String)
], Ispeak.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Ispeak.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Ispeak.prototype, "createdAt", void 0);
Ispeak = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Ispeak);
exports.Ispeak = Ispeak;
exports.IspeakSchema = mongoose_1.SchemaFactory.createForClass(Ispeak);
//# sourceMappingURL=ispeak.schema.js.map