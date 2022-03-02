import { HttpService } from '@nestjs/axios';
import { OpenApiHttpService } from '../service/http.service';
export declare class OpenApiWechatController {
    private readonly httpService;
    private readonly openApiHttpService;
    constructor(httpService: HttpService, openApiHttpService: OpenApiHttpService);
}
