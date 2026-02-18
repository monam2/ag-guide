import { IPostRepository } from "../repositories/IPostRepository";
import { Post } from "../entities/Post";

interface CreatePostRequest {
  title: string;
  content: string;
  authorId: string;
}

export class CreatePost {
  constructor(private postRepository: IPostRepository) {}

  async execute(request: CreatePostRequest): Promise<Post> {
    const todayCount = await this.postRepository.countTodayPosts(
      request.authorId,
    );
    if (todayCount >= 10) {
      throw new Error("Daily post limit reached");
    }

    // Simple ID generation for demo purposes. In production, use UUID or database ID.
    const id = Math.random().toString(36).substring(2, 15);

    const post = Post.create(
      id,
      request.title,
      request.content,
      request.authorId,
    );

    await this.postRepository.save(post);
    return post;
  }
}
