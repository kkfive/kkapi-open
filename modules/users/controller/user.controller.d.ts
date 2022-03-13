import { HttpService } from '@nestjs/axios';
import { UserService } from '../services/user.service';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { AuthService } from 'src/modules/auth/auth.service';
import { OauthService } from '../services/oauth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private readonly httpService;
    private readonly oauthService;
    constructor(userService: UserService, authService: AuthService, httpService: HttpService, oauthService: OauthService);
    getUserList(): Promise<SuccessModal>;
    userGetId(req: any): Promise<SuccessModal>;
    initUser(query: any): Promise<SuccessModal | ErrorModal>;
    login(body: any, req: any): Promise<SuccessModal>;
    getUserInfo(req: any): Promise<SuccessModal>;
    updateUserInfo(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    changePassword(req: any, body: any): Promise<SuccessModal | ErrorModal>;
    githubOAuth(query: any): Promise<SuccessModal | ErrorModal>;
}
