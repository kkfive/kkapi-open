import { HttpService } from '@nestjs/axios';
import { OpenApiHttpService } from '../service/http.service';
export declare class OpenApiQQController {
    private readonly httpService;
    private readonly openApiHttpService;
    constructor(httpService: HttpService, openApiHttpService: OpenApiHttpService);
    getQQAvatar(query: any, res: any): Promise<any>;
}
