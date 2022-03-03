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
exports.OpenApiNoticeService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const pushoo_1 = require("pushoo");
let OpenApiNoticeService = class OpenApiNoticeService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async sendNotice(type, token, content, title) {
        console.log(token, title, content);
        return await (0, pushoo_1.default)(type, {
            token,
            title,
            content,
        });
    }
};
OpenApiNoticeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], OpenApiNoticeService);
exports.OpenApiNoticeService = OpenApiNoticeService;
//# sourceMappingURL=notice.service.js.map