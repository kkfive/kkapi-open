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
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const Response_modal_1 = require("../../../Model/Response.modal");
const token_service_1 = require("../services/token.service");
let TokenController = class TokenController {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async getUserTokenList(req) {
        const res = await this.tokenService.getAllToken({ user: req.user.userId });
        return new Response_modal_1.SuccessModal(res);
    }
    async addUserToken(req, body) {
        const { title, value } = body;
        const titleExits = await this.tokenService.getAllToken({ title, user: req.user.userId });
        if (titleExits.length !== 0) {
            return new Response_modal_1.ErrorModal(null, '当前token已存在');
        }
        else {
            const result = await this.tokenService.addOneToken({ user: req.user.userId, title, value });
            return new Response_modal_1.SuccessModal(result);
        }
    }
    async updateUserToken(req, body) {
        const { title, value, _id } = body;
        const tokenExit = await this.tokenService.getAllToken({ user: req.user.userId, _id });
        if (tokenExit.length !== 0) {
            const updateResult = await this.tokenService.updateOneToken({ user: req.user.userId, _id: body._id }, { title, value });
            if (updateResult.acknowledged && updateResult.modifiedCount === 1) {
                return new Response_modal_1.SuccessModal(updateResult, '更新成功');
            }
            else {
                if (updateResult.matchedCount === 0) {
                    return new Response_modal_1.ErrorModal(updateResult, '没有找到对应token');
                }
                else {
                    return new Response_modal_1.ErrorModal(updateResult, '更新失败');
                }
            }
        }
    }
    async deleteUserToken(req, param) {
        const deleteResult = await this.tokenService.deleteOneToken({
            user: req.user.userId,
            _id: param.id,
        });
        return new Response_modal_1.SuccessModal(deleteResult);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "getUserTokenList", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "addUserToken", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "updateUserToken", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokenController.prototype, "deleteUserToken", null);
TokenController = __decorate([
    (0, common_1.Controller)('/user/token'),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
exports.TokenController = TokenController;
//# sourceMappingURL=token.controller.js.map