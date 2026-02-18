import { Post, PostStatus } from "../entities/Post";

export interface IPostRepository {
  save(post: Post): Promise<void>;
  findById(id: string): Promise<Post | null>;
  findAll(options?: {
    status?: PostStatus;
    authorId?: string;
  }): Promise<Post[]>;
  countTodayPosts(authorId: string): Promise<number>;
}
