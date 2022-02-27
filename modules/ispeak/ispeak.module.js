"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IspeakModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const model_name_1 = require("../../constant/model-name");
const user_module_1 = require("../users/user.module");
const ispeak_controller_1 = require("./controller/ispeak.controller");
const ispeakTag_controller_1 = require("./controller/ispeakTag.controller");
const ipseakTag_schema_1 = require("./schema/ipseakTag.schema");
const ispeak_schema_1 = require("./schema/ispeak.schema");
const ispeak_service_1 = require("./service/ispeak.service");
const ispeakTag_service_1 = require("./service/ispeakTag.service");
let IspeakModule = class IspeakModule {
};
IspeakModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: model_name_1.ISpeakModelName.ISpeakList,
                    schema: ispeak_schema_1.IspeakSchema,
                    collection: model_name_1.ISpeakModelName.ISpeakList,
                },
                {
                    name: model_name_1.ISpeakModelName.ISpeakTagList,
                    schema: ipseakTag_schema_1.IspeakTagSchema,
                    collection: model_name_1.ISpeakModelName.ISpeakTagList,
                },
            ]),
        ],
        controllers: [ispeak_controller_1.IspeakController, ispeakTag_controller_1.IspeakTagController],
        providers: [ispeak_service_1.IspeakService, ispeakTag_service_1.IspeakTagService],
        exports: [ispeak_service_1.IspeakService, ispeakTag_service_1.IspeakTagService],
    })
], IspeakModule);
exports.IspeakModule = IspeakModule;
//# sourceMappingURL=ispeak.module.js.map