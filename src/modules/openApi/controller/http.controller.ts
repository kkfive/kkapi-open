import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Req, Response, Request } from '@nestjs/common';
import { ErrorModal } from 'src/Model/Response.modal';
import { NoAuth } from '../../../common/decorator/customize';
import { OpenApiHttpService } from '../service/http.service';

@Controller('/open/http')
export class OpenApiHttpController {
  constructor(
    private readonly httpService: HttpService,
    private readonly openApiHttpService: OpenApiHttpService,
  ) {}

  @NoAuth()
  @Get('cors')
  async requestCors(@Query() query, @Response() res) {
    const { url } = query;

    if (url) {
      const result = await this.openApiHttpService.requestCors(url);
      res.end(Buffer.from(result.data, result.headers['content-type'] as any));
    } else {
      return res.send(new ErrorModal(null, '获取url失败'));
    }
  }
}
