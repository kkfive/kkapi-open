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
exports.OauthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../../common/utils");
let OauthService = class OauthService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async githubLogin(code) {
        const ClientID = process.env.GITHUB_CLIENT_ID;
        const ClientSecret = process.env.GITHUB_CLIENT_SECRET;
        const config = {
            uri: 'http://github.com/login/oauth/access_token?' +
                `client_id=${ClientID}&` +
                `client_secret=${ClientSecret}&` +
                `code=${code}`,
            headers: {},
        };
        common_1.Logger.log('正在进行Github登录', 'GithubOAuth');
        try {
            const res = await (0, rxjs_1.firstValueFrom)(this.httpService
                .post(config.uri, {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.v3+json',
            })
                .pipe((0, rxjs_1.map)((response) => {
                return (0, utils_1.urlToObj)(response.data);
            })));
            return res;
        }
        catch (e) {
            common_1.Logger.error(e, 'GithubOAuth');
            return null;
        }
    }
    async getUserInfoByGithubToken(access_token) {
        try {
            const res = await (0, rxjs_1.firstValueFrom)(this.httpService
                .request({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: 'Bearer ' + access_token,
                },
            })
                .pipe((0, rxjs_1.map)((response) => {
                return response.data;
            })));
            return res;
        }
        catch (e) {
            common_1.Logger.error(e, '通过access获取个人信息失败');
            return false;
        }
    }
};
OauthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], OauthService);
exports.OauthService = OauthService;
//# sourceMappingURL=oauth.service.js.map