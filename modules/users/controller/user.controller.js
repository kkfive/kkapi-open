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
exports.UserController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const Response_modal_1 = require("../../../Model/Response.modal");
const local_auth_guard_1 = require("../../auth/guards/local-auth.guard");
const auth_service_1 = require("../../auth/auth.service");
const oauth_service_1 = require("../services/oauth.service");
const customize_1 = require("../../../common/decorator/customize");
const encription_1 = require("../../../common/encription");
let UserController = class UserController {
    userService;
    authService;
    httpService;
    oauthService;
    constructor(userService, authService, httpService, oauthService) {
        this.userService = userService;
        this.authService = authService;
        this.httpService = httpService;
        this.oauthService = oauthService;
    }
    async getUserList() {
        const res = await this.userService.findAll();
        return new Response_modal_1.SuccessModal(res);
    }
    async userGetId(req) {
        return new Response_modal_1.SuccessModal({ id: req.user.userId });
    }
    async initUser(query) {
        const users = await this.userService.findAll();
        if (users.length > 0) {
            return new Response_modal_1.ErrorModal(null, '存在用户，初始化失败');
        }
        else {
            const user = await this.userService.createOne({
                userName: query.userName || 'admin',
            });
            return new Response_modal_1.SuccessModal(user);
        }
    }
    async login(body, req) {
        const token = await this.authService.login(req.user);
        const res = {
            token,
            userId: req.user._id,
            userName: req.user.userName,
        };
        return new Response_modal_1.SuccessModal(res, '登录成功');
    }
    async getUserInfo(req) {
        const user = await this.userService.findOne({ _id: req.user.userId });
        const res = {
            token: req.headers.authorization,
            ...user.toObject(),
        };
        return new Response_modal_1.SuccessModal(res);
    }
    async updateUserInfo(body, req) {
        const { avatar, desc, email, homePath, link, nickName, userName, githubId } = body;
        const result = await this.userService.updateOne({ _id: req.user.userId }, {
            avatar,
            desc,
            email,
            homePath,
            link,
            nickName,
            userName,
            githubId,
        });
        if (result.acknowledged && result.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal(result, '更新成功');
        }
        else {
            if (result.matchedCount === 0) {
                return new Response_modal_1.ErrorModal(result, '没有找到对应用户');
            }
            else {
                return new Response_modal_1.ErrorModal(result, '更新失败');
            }
        }
    }
    async changePassword(req, body) {
        let { password } = body;
        const id = req.user.userId;
        const user = await this.userService.findOne({ _id: id }, true);
        const { oldPassword, rpassword } = body;
        if (password !== rpassword) {
            return new Response_modal_1.ErrorModal(null, '两次密码不一致');
        }
        password = (0, encription_1.bcryptEncript)(password);
        if (!(0, encription_1.bcryptValidate)(oldPassword, user.password)) {
            return new Response_modal_1.ErrorModal(null, '旧密码不匹配');
        }
        const res = await this.userService.updateOne({ _id: req.user.userId }, { password });
        if (res.acknowledged && res.modifiedCount === 1) {
            return new Response_modal_1.SuccessModal('修改成功');
        }
        else {
            return new Response_modal_1.ErrorModal(null, '修改失败');
        }
    }
    async githubOAuth(query) {
        if (query.code) {
            const access_token = await this.oauthService.githubLogin(query.code);
            if (!access_token)
                return new Response_modal_1.ErrorModal({}, '服务器内部错误，获取GitHub access_token失败');
            const githubUserInfo = await this.oauthService.getUserInfoByGithubToken(access_token.access_token);
            if (githubUserInfo.type !== 'User')
                return new Response_modal_1.ErrorModal(null, '授权失败');
            if (githubUserInfo.id) {
                const localUserInfo = await this.userService.findOne({ githubId: githubUserInfo.id });
                const jwt = await this.authService.login(localUserInfo && localUserInfo._id ? localUserInfo : { userName: 'Github', _id: '0' });
                return new Response_modal_1.SuccessModal({ token: jwt, userId: localUserInfo?._id || '0' });
            }
        }
        else {
            console.log('query:', query);
            return new Response_modal_1.ErrorModal(null, '缺少code参数');
        }
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, common_1.Get)('/id'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userGetId", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('init'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "initUser", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('getUserInfo'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserInfo", null);
__decorate([
    (0, common_1.Patch)('password'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, customize_1.NoAuth)(),
    (0, common_1.Get)('oauth/github'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "githubOAuth", null);
UserController = __decorate([
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        axios_1.HttpService,
        oauth_service_1.OauthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map