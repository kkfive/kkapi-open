"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_controller_1 = require("./controller/user.controller");
const user_service_1 = require("./services/user.service");
const user_schema_1 = require("./schema/user.schema");
const auth_module_1 = require("../auth/auth.module");
const axios_1 = require("@nestjs/axios");
const oauth_service_1 = require("./services/oauth.service");
const model_name_1 = require("../../constant/model-name");
const token_schema_1 = require("./schema/token.schema");
const token_service_1 = require("./services/token.service");
const token_controller_1 = require("./controller/token.controller");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            mongoose_1.MongooseModule.forFeature([
                { name: model_name_1.UserModelName.User, schema: user_schema_1.UserSchema, collection: model_name_1.UserModelName.User },
                { name: model_name_1.UserModelName.Token, schema: token_schema_1.TokenSchema, collection: model_name_1.UserModelName.Token },
            ]),
        ],
        controllers: [user_controller_1.UserController, token_controller_1.TokenController],
        providers: [user_service_1.UserService, oauth_service_1.OauthService, token_service_1.TokenService],
        exports: [user_service_1.UserService, token_service_1.TokenService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map