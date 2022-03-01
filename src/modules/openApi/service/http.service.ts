import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OpenApiHttpService {
  constructor(private readonly httpService: HttpService) {}
  async requestCors(url) {
    return await this.httpService.axiosRef({
      url,
      responseType: 'arraybuffer',
    });
  }
}
