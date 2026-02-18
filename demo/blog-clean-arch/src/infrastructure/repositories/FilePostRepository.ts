import { IPostRepository } from "../../domain/repositories/IPostRepository";
import { Post, PostStatus } from "../../domain/entities/Post";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

interface PostDTO {
  id: string;
  title: string;
  content: string;
  authorId: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export class FilePostRepository implements IPostRepository {
  private async readData(): Promise<Post[]> {
    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      const dtos: PostDTO[] = JSON.parse(data);
      return dtos.map(
        (dto) =>
          new Post(
            dto.id,
            dto.title,
            dto.content,
            dto.authorId,
            dto.status,
            new Date(dto.createdAt),
            new Date(dto.updatedAt),
          ),
      );
    } catch (error) {
      // If file doesn't exist or error, return empty
      return [];
    }
  }

  private async writeData(posts: Post[]): Promise<void> {
    const dtos: PostDTO[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      status: post.status,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
    await fs.writeFile(DATA_FILE, JSON.stringify(dtos, null, 2), "utf-8");
  }

  async save(post: Post): Promise<void> {
    const posts = await this.readData();
    const index = posts.findIndex((p) => p.id === post.id);
    if (index >= 0) {
      posts[index] = post;
    } else {
      posts.push(post);
    }
    await this.writeData(posts);
  }

  async findById(id: string): Promise<Post | null> {
    const posts = await this.readData();
    return posts.find((p) => p.id === id) || null;
  }

  async findAll(options?: {
    status?: PostStatus;
    authorId?: string;
  }): Promise<Post[]> {
    let posts = await this.readData();

    if (options?.status) {
      posts = posts.filter((p) => p.status === options.status);
    }
    if (options?.authorId) {
      posts = posts.filter((p) => p.authorId === options.authorId);
    }

    return posts;
  }

  async countTodayPosts(authorId: string): Promise<number> {
    const posts = await this.readData();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return posts.filter((p) => p.authorId === authorId && p.createdAt >= today)
      .length;
  }
}
