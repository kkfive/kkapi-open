import { HttpService } from '@nestjs/axios';
import { OpenApiHttpService } from '../service/http.service';
import { SuccessModal } from '../../../Model/Response.modal';
import { NoticeGetParamsDto, NoticePostParamsDto } from '../dtos/notice.dto';
import { OpenApiNoticeService } from '../service/notice.service';
export declare class OpenApiNoticeController {
    private readonly httpService;
    private readonly openApiHttpService;
    private readonly noticeService;
    constructor(httpService: HttpService, openApiHttpService: OpenApiHttpService, noticeService: OpenApiNoticeService);
    getNotice(query: NoticeGetParamsDto): Promise<SuccessModal>;
    postNotice(body: NoticePostParamsDto): Promise<SuccessModal>;
}
