import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { noticeType } from '../dtos/notice.dto';
import notice from 'pushoo';
@Injectable()
export class OpenApiNoticeService {
  constructor(private readonly httpService: HttpService) {}
  async sendNotice(type: noticeType, token: string, content: string, title: string) {
    console.log(token, title, content);

    return await notice(type, {
      token,
      title,
      content,
    });
  }
}
