import { HttpService } from '@nestjs/axios';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { OpenApiHttpService } from '../service/http.service';
export declare class OpenApiGithubController {
    private readonly httpService;
    private readonly openApiHttpService;
    constructor(httpService: HttpService, openApiHttpService: OpenApiHttpService);
    githubDispath(body: any, query: any): Promise<SuccessModal | ErrorModal>;
}
