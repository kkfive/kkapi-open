import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ErrorModal, SuccessModal } from 'src/Model/Response.modal';
import { PostService } from '../service/post.service';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getPostByPage(@Request() req, @Query() query) {
    const result = await this.postService.findAll();
    return new SuccessModal(result);
  }

  @Post('/add')
  async addOnePost(@Body() body) {
    const result = await this.postService.createOne(body);
    return new SuccessModal(result);
  }
}
