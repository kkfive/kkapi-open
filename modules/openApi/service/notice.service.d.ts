import { HttpService } from '@nestjs/axios';
import { noticeType } from '../dtos/notice.dto';
export declare class OpenApiNoticeService {
    private readonly httpService;
    constructor(httpService: HttpService);
    sendNotice(type: noticeType, token: string, content: string, title: string): Promise<any>;
}
