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
exports.OpenApiController = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const Response_modal_1 = require("../../../Model/Response.modal");
const customize_1 = require("../../../common/decorator/customize");
let OpenApiController = class OpenApiController {
    async getVersion() {
        const { version, date } = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'), 'utf-8'));
        return new Response_modal_1.SuccessModal({ version, date });
    }
};
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('version'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenApiController.prototype, "getVersion", null);
OpenApiController = __decorate([
    (0, common_1.Controller)('/openapi')
], OpenApiController);
exports.OpenApiController = OpenApiController;
//# sourceMappingURL=api.controller.js.map