import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { PostSchema, Post } from '../schema/post.schema';
import { PostService } from '../service/post.service';
import { PostController } from '../controller/post.controller';

@Module({
  imports: [
    forwardRef(() => HttpModule),
    //这里添加配置。对应引入模块（注意里面的括号结构别给坑了。这里我卡了半天）
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class FriendCircleModule {}
