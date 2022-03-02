import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Req, Response, Request, Body, All } from '@nestjs/common';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { NoAuth } from '../../../common/decorator/customize';
import { OpenApiHttpService } from '../service/http.service';

@Controller('/open/github')
export class OpenApiGithubController {
  constructor(
    private readonly httpService: HttpService,
    private readonly openApiHttpService: OpenApiHttpService,
  ) {}

  @NoAuth()
  @All('dispatch')
  async githubDispath(@Body() body, @Query() query) {
    const token = body.token || query.token;
    const owner = body.owner || query.owner;
    const repo = body.repo || query.repo;
    const event_type = body.text || query.text || 'kkapi dispath';
    if (!token) return new ErrorModal(null, 'token是必须的字段');
    if (!owner || !repo) return new ErrorModal(null, 'owner或者repo字段未填写');
    const result = await this.httpService.axiosRef({
      url: `https://api.github.com/repos/${owner}/${repo}/dispatches`,
      data: {
        event_type,
      },
      headers: {
        Authorization: token,
      },
      method: 'POST',
    });
    if (result.headers) {
      const remaining = result.headers['X-RateLimit-Remaining'];
      return new SuccessModal(
        {
          'X-RateLimit-Remaining': remaining,
        },
        `请求成功！请跳转链接查看：https://github.com/${owner}/${repo}/actions`,
      );
    } else {
      return new ErrorModal(null, '请求失败', 500);
    }
  }
}
