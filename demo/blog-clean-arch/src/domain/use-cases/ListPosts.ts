import { IPostRepository } from "../repositories/IPostRepository";
import { Post, PostStatus } from "../entities/Post";

interface ListPostsRequest {
  status?: PostStatus;
  authorId?: string;
}

export class ListPosts {
  constructor(private postRepository: IPostRepository) {}

  async execute(request?: ListPostsRequest): Promise<Post[]> {
    return this.postRepository.findAll(request);
  }
}
