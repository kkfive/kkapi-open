import { HttpService } from '@nestjs/axios';
import { OpenApiHttpService } from '../service/http.service';
export declare class OpenApiTelegramController {
    private readonly httpService;
    private readonly openApiHttpService;
    constructor(httpService: HttpService, openApiHttpService: OpenApiHttpService);
}
