import { IPostRepository } from "../repositories/IPostRepository";
import { Post } from "../entities/Post";

interface PublishPostRequest {
  id: string;
  userId: string;
}

export class PublishPost {
  constructor(private postRepository: IPostRepository) {}

  async execute(request: PublishPostRequest): Promise<Post> {
    const post = await this.postRepository.findById(request.id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== request.userId) {
      throw new Error("Unauthorized");
    }

    post.publish();
    await this.postRepository.save(post);
    return post;
  }
}
