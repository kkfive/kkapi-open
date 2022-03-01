import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OpenApiWechatService {
  constructor(private readonly httpService: HttpService) {}
}
