"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const axios_1 = require("@nestjs/axios");
const qq_controller_1 = require("./controller/qq.controller");
const http_service_1 = require("./service/http.service");
const http_controller_1 = require("./controller/http.controller");
const github_controller_1 = require("./controller/github.controller");
const telegram_conroller_1 = require("./controller/telegram.conroller");
const wechat_controller_1 = require("./controller/wechat.controller");
const qq_service_1 = require("./service/qq.service");
const github_service_1 = require("./service/github.service");
const telegram_service_1 = require("./service/telegram.service");
const wechat_service_1 = require("./service/wechat.service");
const notice_controller_1 = require("./controller/notice.controller");
const notice_service_1 = require("./service/notice.service");
const api_controller_1 = require("./controller/api.controller");
let OpenApiModule = class OpenApiModule {
};
OpenApiModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, (0, common_1.forwardRef)(() => auth_module_1.AuthModule), mongoose_1.MongooseModule.forFeature([])],
        controllers: [
            api_controller_1.OpenApiController,
            qq_controller_1.OpenApiQQController,
            http_controller_1.OpenApiHttpController,
            github_controller_1.OpenApiGithubController,
            telegram_conroller_1.OpenApiTelegramController,
            wechat_controller_1.OpenApiWechatController,
            notice_controller_1.OpenApiNoticeController,
        ],
        providers: [
            http_service_1.OpenApiHttpService,
            qq_service_1.OpenApiQQService,
            github_service_1.OpenApiGithubService,
            telegram_service_1.OpenApiTelegramService,
            wechat_service_1.OpenApiWechatService,
            notice_service_1.OpenApiNoticeService,
        ],
        exports: [
            http_service_1.OpenApiHttpService,
            qq_service_1.OpenApiQQService,
            github_service_1.OpenApiGithubService,
            telegram_service_1.OpenApiTelegramService,
            wechat_service_1.OpenApiWechatService,
            notice_service_1.OpenApiNoticeService,
        ],
    })
], OpenApiModule);
exports.OpenApiModule = OpenApiModule;
//# sourceMappingURL=openApi.module.js.map