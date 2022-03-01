import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { TokenService } from '../services/token.service';
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    getUserTokenList(req: any): Promise<SuccessModal>;
    addUserToken(req: any, body: any): Promise<SuccessModal | ErrorModal>;
    updateUserToken(req: any, body: any): Promise<SuccessModal | ErrorModal>;
    deleteUserToken(req: any, param: any): Promise<SuccessModal>;
}
