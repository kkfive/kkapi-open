import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { IspeakTagService } from '../service/ispeakTag.service';
export declare class IspeakTagController {
    private readonly ispeakService;
    constructor(ispeakService: IspeakTagService);
    getAllTag(query: any, req: any): Promise<SuccessModal | ErrorModal>;
    getTagsByUserId(query: any): Promise<SuccessModal>;
    getIspeakTagByPage(query: any, req: any): Promise<SuccessModal>;
    addTag(body: any, req: any): Promise<SuccessModal | ErrorModal>;
    updateIspeakTag(body: any): Promise<SuccessModal | ErrorModal>;
}
