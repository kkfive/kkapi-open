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
exports.IspeakController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const customize_1 = require("../../../common/decorator/customize");
const token_name_1 = require("../../../constant/token-name");
const Response_modal_1 = require("../../../Model/Response.modal");
const token_service_1 = require("../../users/services/token.service");
const ispeak_schema_1 = require("../schema/ispeak.schema");
const ispeak_service_1 = require("../service/ispeak.service");
let IspeakController = class IspeakController {
    ispeakService;
    tokenService;
    constructor(ispeakService, tokenService) {
        this.ispeakService = ispeakService;
        this.tokenService = tokenService;
    }
    async getSpeakByPage(req, query) {
        const { author } = query;
        let { page = 1, pageSize = 10 } = query;
        if (!author)
            return new Response_modal_1.ErrorModal(null, '需要指定查询的用户');
        const type = ['0', '1'];
        if (req?.user?.userId && req?.user?.userId === author) {
            type.push('2');
        }
        try {
            page = Number(page);
            pageSize = Number(pageSize);
        }
        catch (error) {
            return new Response_modal_1.ErrorModal(null, '请传入正确的参数');
        }
        const result = await this.ispeakService.getSpeakByPage(page, pageSize, {
            author,
            type,
        });
        const returnObj = {
            total: 0,
            items: [],
            isLogin: req.user && req.user.userId ? req.user.userId : null,
        };
        result.forEach((res) => {
            returnObj.total = res.total ? res.total[0]?.total : 0;
            res.items.forEach((item) => {
                item.author = item.author
                    ? {
                        nickName: item.author[0].nickName,
                        avatar: item.author[0].avatar,
                    }
                    : { nickName: '', avatar: '' };
                item.tag = item.tag ? item.tag[0] : {};
                if (item.type === '0') {
                    returnObj.items.push(item);
                }
                else if (item.type === '1') {
                    if (req.user && req.user.userId) {
                        returnObj.items.push(item);
                    }
                    else {
                        returnObj.items.push({
                            _id: item._id,
                            updatedAt: item.updatedAt,
                            createdAt: item.createdAt,
                            author: item.author,
                            type: '1',
                            content: '该内容需登录后查看',
                            title: '',
                        });
                    }
                }
                else if (item.type === '2') {
                    if (req.user && req.user.userId && req.user.userId === author) {
                        returnObj.items.push(item);
                    }
                    else {
                        returnObj.items.push({
                            _id: item._id,
                            updatedAt: item.updatedAt,
                            createdAt: item.createdAt,
                            type: '2',
                            content: '该内容仅作者可见',
                            title: '',
                        });
                    }
                }
            });
        });
        return new Response_modal_1.SuccessModal(returnObj);
    }
    async getIspeakByPage(query, req) {
        const { page, pageSize, _t, ...otherQuery } = query;
        const queryOptions = otherQuery;
        queryOptions['author'] = queryOptions.author || req.user.userId;
        const result = await this.ispeakService.getSpeakByPage(Number(page), Number(pageSize), queryOptions);
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
    async addOneSpeak(req, body) {
        const userId = req.user.userId;
        const { title, content, type, tag } = body;
        const result = await this.ispeakService.addOneSpeak({
            title,
            content,
            type,
            tag,
            author: userId,
        });
        return new Response_modal_1.SuccessModal(result);
    }
    async addOneSpeakByToken(body) {
        const { title, content, type, tag, showComment } = body;
        const token = body['token'];
        const user = await this.tokenService.getOneToken({ title: token_name_1.TokenName.Speak, value: token });
        if (!user)
            return new Response_modal_1.ErrorModal(null, '此token不存在');
        if (!(0, mongoose_1.isValidObjectId)(tag))
            return new Response_modal_1.ErrorModal(null, '请传入标签的id');
        const result = await this.ispeakService.addOneSpeak({
            title,
            content,
            type,
            tag,
            showComment,
            author: user.user,
        });
        return new Response_modal_1.SuccessModal(result);
    }
    async updateSpeak(body, req) {
        let { _id, ...updateData } = body;
        const updateAuthor = req.user.userId;
        const res = await this.ispeakService.findOneAndUpdate({ _id, author: updateAuthor }, updateData);
        if (res.acknowledged && res.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(res, '更新成功');
        }
        else {
            if (res.matchedCount === 0) {
                return new Response_modal_1.ErrorModal(res, '没有找到对应speak');
            }
            else {
                return new Response_modal_1.ErrorModal(res, '更新失败');
            }
        }
    }
    async updateSpeakStatus(body, req) {
        let { _id, showComment } = body;
        const updateAuthor = req.user.userId;
        const result = await this.ispeakService.findOneAndUpdate({ _id, author: updateAuthor }, { showComment });
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '更新成功');
        }
        else {
            if (result.matchedCount === 0) {
                return new Response_modal_1.ErrorModal(result, '没有找到对应speak');
            }
            else {
                return new Response_modal_1.ErrorModal(result, '更新失败');
            }
        }
    }
    async deleteOneSpeak(param) {
        if (!param.id || !(0, mongoose_1.isValidObjectId)(param?.id))
            return new Response_modal_1.ErrorModal(null, 'id不合法');
        const res = await this.ispeakService.findOneAndDelete({ _id: param.id });
        return new Response_modal_1.SuccessModal(res);
    }
    async getOneSpeak1(param) {
        const res = await this.ispeakService.findOne({ _id: param.id });
        return new Response_modal_1.SuccessModal(res.length ? res[0] : []);
    }
};
__decorate([
    (0, customize_1.IsLogin)(),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getSpeakByPage", null);
__decorate([
    (0, common_1.Get)('/getByPage'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getIspeakByPage", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ispeak_schema_1.Ispeak]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "addOneSpeak", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Post)('/addByToken'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ispeak_schema_1.Ispeak]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "addOneSpeakByToken", null);
__decorate([
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "updateSpeak", null);
__decorate([
    (0, common_1.Patch)('/status/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "updateSpeakStatus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "deleteOneSpeak", null);
__decorate([
    (0, common_1.Get)('/get/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IspeakController.prototype, "getOneSpeak1", null);
IspeakController = __decorate([
    (0, common_1.Controller)('/ispeak'),
    __metadata("design:paramtypes", [ispeak_service_1.IspeakService,
        token_service_1.TokenService])
], IspeakController);
exports.IspeakController = IspeakController;
//# sourceMappingURL=ispeak.controller.js.map