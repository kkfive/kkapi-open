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
exports.OpenApiHttpController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const Response_modal_1 = require("../../../Model/Response.modal");
const customize_1 = require("../../../common/decorator/customize");
const http_service_1 = require("../service/http.service");
let OpenApiHttpController = class OpenApiHttpController {
    httpService;
    openApiHttpService;
    constructor(httpService, openApiHttpService) {
        this.httpService = httpService;
        this.openApiHttpService = openApiHttpService;
    }
    async requestCors(query, res) {
        return res.send(new Response_modal_1.ErrorModal(null, '如需使用，请自行注释此行'));
        const { url } = query;
        if (url) {
            const result = await this.openApiHttpService.requestCors(url);
            res.end(Buffer.from(result.data, result.headers['content-type']));
        }
        else {
            return res.send(new Response_modal_1.ErrorModal(null, '获取url失败'));
        }
    }
};
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('cors'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OpenApiHttpController.prototype, "requestCors", null);
OpenApiHttpController = __decorate([
    (0, common_1.Controller)('/open/http'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        http_service_1.OpenApiHttpService])
], OpenApiHttpController);
exports.OpenApiHttpController = OpenApiHttpController;
//# sourceMappingURL=http.controller.js.map