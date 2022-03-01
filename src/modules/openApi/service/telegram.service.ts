import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OpenApiTelegramService {
  constructor(private readonly httpService: HttpService) {}
}
