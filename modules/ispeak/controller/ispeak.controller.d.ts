import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { TokenService } from 'src/modules/users/services/token.service';
import { Ispeak } from '../schema/ispeak.schema';
import { IspeakService } from '../service/ispeak.service';
export declare class IspeakController {
    private readonly ispeakService;
    private readonly tokenService;
    constructor(ispeakService: IspeakService, tokenService: TokenService);
    getSpeakByPage(req: any, query: any): Promise<SuccessModal | ErrorModal>;
    getIspeakByPage(query: any, req: any): Promise<SuccessModal>;
    addOneSpeak(req: any, body: Ispeak): Promise<SuccessModal>;
    addOneSpeakByToken(body: Ispeak): Promise<SuccessModal | ErrorModal>;
    updateSpeak(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    updateSpeakStatus(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    deleteOneSpeak(param: any): Promise<SuccessModal | ErrorModal>;
    getOneSpeak1(param: any): Promise<SuccessModal>;
}
