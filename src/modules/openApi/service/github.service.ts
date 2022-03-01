import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OpenApiGithubService {
  constructor(private readonly httpService: HttpService) {}
}
