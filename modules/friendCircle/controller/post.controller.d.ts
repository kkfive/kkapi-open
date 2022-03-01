import { SuccessModal } from 'src/Model/Response.modal';
import { PostService } from '../service/post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPostByPage(req: any, query: any): Promise<SuccessModal>;
    addOnePost(body: any): Promise<SuccessModal>;
}
