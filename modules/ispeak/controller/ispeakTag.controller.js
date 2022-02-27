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
exports.IspeakTagController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const customize_1 = require("../../../common/decorator/customize");
const Response_modal_1 = require("../../../Model/Response.modal");
const ispeakTag_service_1 = require("../service/ispeakTag.service");
let IspeakTagController = class IspeakTagController {
    ispeakService;
    constructor(ispeakService) {
        this.ispeakService = ispeakService;
    }
    async getAllTag(query, req) {
        const otherQuery = {};
        const urerId = query.userId || req.user.userId;
        if (urerId) {
            if (!(0, mongoose_1.isValidObjectId)(urerId))
                return new Response_modal_1.SuccessModal([]);
            otherQuery['user'] = urerId;
            const res = await this.ispeakService.getTagList(otherQuery);
            return new Response_modal_1.SuccessModal(res);
        }
        else {
            return new Response_modal_1.SuccessModal([]);
        }
    }
    async getTagsByUserId(query) {
        const otherQuery = {};
        const urerId = query.userId;
        if (urerId) {
            if (!(0, mongoose_1.isValidObjectId)(urerId))
                return new Response_modal_1.SuccessModal([]);
            otherQuery['user'] = urerId;
            const res = await this.ispeakService.getTagList(otherQuery);
            return new Response_modal_1.SuccessModal(res);
        }
        else {
            return new Response_modal_1.SuccessModal([]);
        }
    }
    async getIspeakTagByPage(query, req) {
        const { page, pageSize, _t, ...otherQuery } = query;
        const queryOptions = otherQuery;
        otherQuery['user'] = req.user.userId;
        const result = await this.ispeakService.findIspeakTagByPage(Number(page), Number(pageSize), queryOptions);
        const returnObj = {
            total: 0,
            items: [],
        };
        if (result.length > 0) {
            result.forEach((item) => {
                if (item.total.length > 0) {
                    returnObj.total += item.total[0].total;
                    returnObj.items.push(...item.items);
                }
            });
        }
        return new Response_modal_1.SuccessModal(returnObj);
    }
    async addTag(body, req) {
        const userId = req.user.userId;
        if (!userId)
            return new Response_modal_1.ErrorModal(null, '请先登录');
        if (body.name) {
            const tag = await this.ispeakService.findOneTag({
                user: userId,
                name: body.name,
                orderNo: body.orderNo,
                description: body.description,
            });
            if (tag) {
                return new Response_modal_1.ErrorModal(tag, '标签已存在');
            }
            else {
                const res = await this.ispeakService.createOneTag(body.name, body.bgColor, {
                    user: userId,
                    orderNo: body.orderNo || 0,
                    description: body.description || '',
                });
                return new Response_modal_1.SuccessModal(res);
            }
        }
        else {
            return new Response_modal_1.ErrorModal(null, '请填写标签名称。');
        }
    }
    async updateIspeakTag(body) {
        const { _id, ...updateData } = body;
        const res = await this.ispeakService.findOneIspeakTagUpdate({ _id }, updateData);
        if (res.acknowledged && res.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(res, '更新成功');
        }
        else {
            return new Response_modal_1.ErrorModal(res, '更新失败');
        }
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakTagController.prototype, "getAllTag", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IspeakTagController.prototype, "getTagsByUserId", null);
__decorate([
    (0, common_1.Get)('/getByPage'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakTagController.prototype, "getIspeakTagByPage", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakTagController.prototype, "addTag", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IspeakTagController.prototype, "updateIspeakTag", null);
IspeakTagController = __decorate([
    (0, common_1.Controller)('/ispeak/tag'),
    __metadata("design:paramtypes", [ispeakTag_service_1.IspeakTagService])
], IspeakTagController);
exports.IspeakTagController = IspeakTagController;
//# sourceMappingURL=ispeakTag.controller.js.map