import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Req, Response, Request } from '@nestjs/common';
import { ErrorModal } from 'src/Model/Response.modal';
import { NoAuth } from '../../../common/decorator/customize';
import { SuccessModal } from '../../../Model/Response.modal';
import { OpenApiHttpService } from '../service/http.service';

@Controller('/open/qq')
export class OpenApiQQController {
  constructor(
    private readonly httpService: HttpService,
    private readonly openApiHttpService: OpenApiHttpService,
  ) {}

  @NoAuth()
  @Get('avatar')
  async getQQAvatar(@Query() query, @Response() res) {
    const { qq, r } = query;

    if (qq) {
      const url = `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=0`;
      if (r) {
        const result = await this.openApiHttpService.requestCors(url);
        res.end(Buffer.from(result.data, result.headers['content-type'] as any));
      } else {
        return res.redirect(url, 302);
      }
    } else {
      return res.send(new ErrorModal(null, '获取qq失败'));
    }
  }
}
