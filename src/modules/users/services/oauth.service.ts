import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { urlToObj } from 'src/common/utils';
@Injectable()
export class OauthService {
  constructor(private readonly httpService: HttpService) {}
  /**
   * 通过code进行gitee登录认证
   */
  async giteeLogin(code: string) {
    const ClientID = process.env.GITEE_CLIENT_ID;
    const ClientSecret = process.env.GITEE_CLIENT_SECRET;
    const RedirectURI = process.env.GITEE_REDIRECT_URI;
    const config = {
      uri: 'https://gitee.com/oauth/token',
      data: {
        code,
        grant_type: 'authorization_code',
        client_id: ClientID,
        client_secret: ClientSecret,
        redirect_uri: RedirectURI,
      },
    };
    Logger.log('正在进行Gitee登录', 'GithubOAuth');
    try {
      const res = await firstValueFrom(
        this.httpService
          .request({
            method: 'post',
            url: config.uri,
            data: config.data,
          })
          .pipe(
            map((response) => {
              return response.data;
            }),
          ),
      );
      return res;
    } catch (e) {
      Logger.error(e, 'GiteeOAuth');
      return false;
    }
  }
  async githubLogin(code) {
    const ClientID = process.env.GITHUB_CLIENT_ID;
    const ClientSecret = process.env.GITHUB_CLIENT_SECRET;
    const config = {
      uri:
        'http://github.com/login/oauth/access_token?' +
        `client_id=${ClientID}&` +
        `client_secret=${ClientSecret}&` +
        `code=${code}`,
      headers: {},
    };
    Logger.log('正在进行Github登录', 'GithubOAuth');
    try {
      const res = await firstValueFrom(
        this.httpService
          .post(config.uri, {
            'Content-Type': 'application/json',
            // Accept: 'application/vnd.github.v3+json',
            Accept: 'application/vnd.github.v3+json',
          })
          .pipe(
            map((response) => {
              return urlToObj(response.data);
            }),
          ),
      );
      return res;
    } catch (e) {
      Logger.error(e, 'GithubOAuth');
      return null;
    }
  }
  /**
   * 通过access_token获取用户个人信息
   * @param access_token
   * @returns
   */
  async getUserInfoByGiteeToken(access_token: string) {
    try {
      const res = await firstValueFrom(
        this.httpService
          .request({
            method: 'get',
            url: `https://gitee.com/api/v5/user`,
            params: {
              access_token,
            },
          })
          .pipe(
            map((response) => {
              return response.data;
            }),
          ),
      );
      return res;
    } catch (e) {
      Logger.error(e, '通过access获取个人信息失败');
      return false;
    }
  }
  /**
   * 通过access_token获取用户个人信息
   * @param access_token
   * @returns
   */
  async getUserInfoByGithubToken(access_token: string) {
    try {
      const res = await firstValueFrom(
        this.httpService
          .request({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          })
          .pipe(
            map((response) => {
              return response.data;
            }),
          ),
      );
      return res;
    } catch (e) {
      Logger.error(e, '通过access获取个人信息失败');
      return false;
    }
  }
}
