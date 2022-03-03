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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiNoticeController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const customize_1 = require("../../../common/decorator/customize");
const http_service_1 = require("../service/http.service");
const Response_modal_1 = require("../../../Model/Response.modal");
const notice_dto_1 = require("../dtos/notice.dto");
const notice_service_1 = require("../service/notice.service");
let OpenApiNoticeController = class OpenApiNoticeController {
    httpService;
    openApiHttpService;
    noticeService;
    constructor(httpService, openApiHttpService, noticeService) {
        this.httpService = httpService;
        this.openApiHttpService = openApiHttpService;
        this.noticeService = noticeService;
    }
    async getNotice(query) {
        const { type, title, content, token } = query;
        const result = await this.noticeService.sendNotice(type, token, content, title);
        return new Response_modal_1.SuccessModal(result);
    }
    async postNotice(body) {
        const { type, title, content, token } = body;
        const result = await this.noticeService.sendNotice(type, token, content, title);
        return new Response_modal_1.SuccessModal(result);
    }
};
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_dto_1.NoticeGetParamsDto]),
    __metadata("design:returntype", Promise)
], OpenApiNoticeController.prototype, "getNotice", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_dto_1.NoticePostParamsDto]),
    __metadata("design:returntype", Promise)
], OpenApiNoticeController.prototype, "postNotice", null);
OpenApiNoticeController = __decorate([
    (0, common_1.Controller)('/open/notice'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        http_service_1.OpenApiHttpService,
        notice_service_1.OpenApiNoticeService])
], OpenApiNoticeController);
exports.OpenApiNoticeController = OpenApiNoticeController;
//# sourceMappingURL=notice.controller.js.map