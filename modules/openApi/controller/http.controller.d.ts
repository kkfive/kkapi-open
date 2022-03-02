import { HttpService } from '@nestjs/axios';
import { OpenApiHttpService } from '../service/http.service';
export declare class OpenApiHttpController {
    private readonly httpService;
    private readonly openApiHttpService;
    constructor(httpService: HttpService, openApiHttpService: OpenApiHttpService);
    requestCors(query: any, res: any): Promise<any>;
}
