"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendCircleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const post_schema_1 = require("../schema/post.schema");
const post_service_1 = require("../service/post.service");
const post_controller_1 = require("../controller/post.controller");
const model_name_1 = require("../../../constant/model-name");
let FriendCircleModule = class FriendCircleModule {
};
FriendCircleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => axios_1.HttpModule),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: model_name_1.ThirdPartyName.FriendCirclePost,
                    schema: post_schema_1.PostSchema,
                    collection: model_name_1.ThirdPartyName.FriendCirclePost,
                },
            ]),
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
        exports: [post_service_1.PostService],
    })
], FriendCircleModule);
exports.FriendCircleModule = FriendCircleModule;
//# sourceMappingURL=post.module.js.map