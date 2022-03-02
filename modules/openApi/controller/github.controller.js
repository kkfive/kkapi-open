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
exports.OpenApiGithubController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const Response_modal_1 = require("../../../Model/Response.modal");
const customize_1 = require("../../../common/decorator/customize");
const http_service_1 = require("../service/http.service");
let OpenApiGithubController = class OpenApiGithubController {
    httpService;
    openApiHttpService;
    constructor(httpService, openApiHttpService) {
        this.httpService = httpService;
        this.openApiHttpService = openApiHttpService;
    }
    async githubDispath(body, query) {
        const token = body.token || query.token;
        const owner = body.owner || query.owner;
        const repo = body.repo || query.repo;
        const event_type = body.text || query.text || 'kkapi dispath';
        if (!token)
            return new Response_modal_1.ErrorModal(null, 'token是必须的字段');
        if (!owner || !repo)
            return new Response_modal_1.ErrorModal(null, 'owner或者repo字段未填写');
        const result = await this.httpService.axiosRef({
            url: `https://api.github.com/repos/${owner}/${repo}/dispatches`,
            data: {
                event_type,
            },
            headers: {
                Authorization: 'Bearer ' + token,
            },
            method: 'POST',
        });
        if (result.headers) {
            return new Response_modal_1.SuccessModal({
                'x-oauth-scopes': result.headers['x-oauth-scopes'],
                'x-ratelimit-limit': result.headers['x-ratelimit-limit'],
                'x-ratelimit-remaining': result.headers['x-ratelimit-remaining'],
                'x-ratelimit-reset': result.headers['x-ratelimit-reset'],
                'x-ratelimit-resource': result.headers['x-ratelimit-resource'],
                'x-ratelimit-used': result.headers['x-ratelimit-used'],
            }, `请求成功!请跳转链接查看:https://github.com/${owner}/${repo}/actions`);
        }
        else {
            return new Response_modal_1.ErrorModal(null, '请求失败', 500);
        }
    }
};
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.All)('dispatch'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OpenApiGithubController.prototype, "githubDispath", null);
OpenApiGithubController = __decorate([
    (0, common_1.Controller)('/open/github'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        http_service_1.OpenApiHttpService])
], OpenApiGithubController);
exports.OpenApiGithubController = OpenApiGithubController;
//# sourceMappingURL=github.controller.js.map