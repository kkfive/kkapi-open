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
exports.OpenApiTelegramController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const http_service_1 = require("../service/http.service");
let OpenApiTelegramController = class OpenApiTelegramController {
    httpService;
    openApiHttpService;
    constructor(httpService, openApiHttpService) {
        this.httpService = httpService;
        this.openApiHttpService = openApiHttpService;
    }
};
OpenApiTelegramController = __decorate([
    (0, common_1.Controller)('/open/telegram'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        http_service_1.OpenApiHttpService])
], OpenApiTelegramController);
exports.OpenApiTelegramController = OpenApiTelegramController;
//# sourceMappingURL=telegram.conroller.js.map