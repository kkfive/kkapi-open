import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { OpenApiQQController } from './controller/qq.controller';
import { OpenApiHttpService } from './service/http.service';
import { OpenApiHttpController } from './controller/http.controller';
import { OpenApiGithubController } from './controller/github.controller';
import { OpenApiTelegramController } from './controller/telegram.conroller';
import { OpenApiWechatController } from './controller/wechat.controller';
import { OpenApiQQService } from './service/qq.service';
import { OpenApiGithubService } from './service/github.service';
import { OpenApiTelegramService } from './service/telegram.service';
import { OpenApiWechatService } from './service/wechat.service';
import { OpenApiNoticeController } from './controller/notice.controller';
import { OpenApiNoticeService } from './service/notice.service';
import { OpenApiController } from './controller/api.controller';
@Module({
  imports: [HttpModule, forwardRef(() => AuthModule), MongooseModule.forFeature([])],
  controllers: [
    OpenApiController,
    OpenApiQQController,
    OpenApiHttpController,
    OpenApiGithubController,
    OpenApiTelegramController,
    OpenApiWechatController,
    OpenApiNoticeController,
  ],
  providers: [
    OpenApiHttpService,
    OpenApiQQService,
    OpenApiGithubService,
    OpenApiTelegramService,
    OpenApiWechatService,
    OpenApiNoticeService,
  ],
  exports: [
    OpenApiHttpService,
    OpenApiQQService,
    OpenApiGithubService,
    OpenApiTelegramService,
    OpenApiWechatService,
    OpenApiNoticeService,
  ],
})
export class OpenApiModule {}
