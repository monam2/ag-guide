import { IPostRepository } from "../repositories/IPostRepository";
import { Post } from "../entities/Post";

interface UpdatePostRequest {
  id: string;
  title: string;
  content: string;
  userId: string;
}

export class UpdatePost {
  constructor(private postRepository: IPostRepository) {}

  async execute(request: UpdatePostRequest): Promise<Post> {
    const post = await this.postRepository.findById(request.id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== request.userId) {
      // Simple ownership check
      // In a real app, might allow Admin bypass here or in a separate policy
      throw new Error("Unauthorized");
    }

    post.update(request.title, request.content);
    await this.postRepository.save(post);
    return post;
  }
}
