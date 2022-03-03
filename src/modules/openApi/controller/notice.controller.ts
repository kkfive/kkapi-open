import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Req, Response, Request, Body, All, Post } from '@nestjs/common';
import { query } from 'express';
import { ErrorModal } from 'src/Model/Response.modal';
import { NoAuth } from '../../../common/decorator/customize';
import { OpenApiHttpService } from '../service/http.service';
import { SuccessModal } from '../../../Model/Response.modal';
import { NoticeGetParamsDto, NoticePostParamsDto, noticeType } from '../dtos/notice.dto';
import { OpenApiNoticeService } from '../service/notice.service';

@Controller('/open/notice')
export class OpenApiNoticeController {
  constructor(
    private readonly httpService: HttpService,
    private readonly openApiHttpService: OpenApiHttpService,
    private readonly noticeService: OpenApiNoticeService,
  ) {}
  @NoAuth()
  @Get('/')
  async getNotice(@Query() query: NoticeGetParamsDto) {
    const { type, title, content, token } = query;
    const result = await this.noticeService.sendNotice(type, token, content, title);
    return new SuccessModal(result);
  }

  @NoAuth()
  @Post('/')
  async postNotice(@Body() body: NoticePostParamsDto) {
    const { type, title, content, token } = body;
    const result = await this.noticeService.sendNotice(type, token, content, title);
    return new SuccessModal(result);
  }
}
