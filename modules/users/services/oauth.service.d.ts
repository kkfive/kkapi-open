import { HttpService } from '@nestjs/axios';
export declare class OauthService {
    private readonly httpService;
    constructor(httpService: HttpService);
    githubLogin(code: any): Promise<any>;
    getUserInfoByGithubToken(access_token: string): Promise<any>;
}
