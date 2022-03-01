import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class OpenApiQQService {
  constructor(private readonly httpService: HttpService) {}
}
