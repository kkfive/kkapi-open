import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `./local.env` });
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { IspeakModule } from './modules/ispeak/ispeak.module';
import { OpenApiModule } from './modules/openApi/openApi.module';

const controllers = [AppController];
const providers = [AppService];

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    IspeakModule,
    OpenApiModule,
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASSWORD,
    }),
  ],
  controllers,
  providers,
})
export class AppModule {}
