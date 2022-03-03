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
exports.NoticePostParamsDto = exports.NoticeGetParamsDto = exports.NoticeParamsDto = exports.noticeType = void 0;
const class_validator_1 = require("class-validator");
var noticeType;
(function (noticeType) {
    noticeType["QMSG"] = "qmsg";
    noticeType["SERVER_CHAIN"] = "serverchain";
    noticeType["PUSH_PLUS"] = "pushplus";
    noticeType["PUSH_PLUS_HXTRIP"] = "pushplushxtrip";
    noticeType["DING_TALK"] = "dingtalk";
    noticeType["WECOM"] = "wecom";
    noticeType["BARK"] = "bark";
    noticeType["GO_CQHTTP"] = "gocqhttp";
    noticeType["PUSH_DEER"] = "pushdeer";
    noticeType["IGOT"] = "igot";
    noticeType["TELEGRAM"] = "telegram";
})(noticeType = exports.noticeType || (exports.noticeType = {}));
class NoticeParamsDto {
    type;
    token;
    title;
    content;
}
__decorate([
    (0, class_validator_1.IsEnum)(noticeType, { message: '类型参考:https://www.npmjs.com/pushoo' }),
    __metadata("design:type", String)
], NoticeParamsDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '请传入发送token' }),
    __metadata("design:type", String)
], NoticeParamsDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '请传入发送消息' }),
    __metadata("design:type", String)
], NoticeParamsDto.prototype, "content", void 0);
exports.NoticeParamsDto = NoticeParamsDto;
class NoticeGetParamsDto extends NoticeParamsDto {
}
exports.NoticeGetParamsDto = NoticeGetParamsDto;
class NoticePostParamsDto extends NoticeParamsDto {
}
exports.NoticePostParamsDto = NoticePostParamsDto;
//# sourceMappingURL=notice.dto.js.map