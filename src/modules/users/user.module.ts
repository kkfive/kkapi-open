import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { UserSchema, User } from './schema/user.schema';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { OauthService } from './services/oauth.service';
import { UserModelName } from 'src/constant/model-name';
import { TokenSchema } from './schema/token.schema';
import { TokenService } from './services/token.service';
import { TokenController } from './controller/token.controller';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => AuthModule),
    //这里添加配置。对应引入模块（注意里面的括号结构别给坑了。这里我卡了半天）
    MongooseModule.forFeature([
      { name: UserModelName.User, schema: UserSchema, collection: UserModelName.User },
      { name: UserModelName.Token, schema: TokenSchema, collection: UserModelName.Token },
    ]),
  ],
  controllers: [UserController, TokenController],
  providers: [UserService, OauthService, TokenService],
  exports: [UserService, TokenService],
})
// export class UserModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(HashPasswordMiddleware).forRoutes();
//   }
// }
export class UserModule {}
