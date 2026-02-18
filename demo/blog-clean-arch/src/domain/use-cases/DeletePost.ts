import { IPostRepository } from "../repositories/IPostRepository";

interface DeletePostRequest {
  id: string;
  userId: string;
}

export class DeletePost {
  constructor(private postRepository: IPostRepository) {}

  async execute(request: DeletePostRequest): Promise<void> {
    const post = await this.postRepository.findById(request.id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== request.userId) {
      throw new Error("Unauthorized");
    }

    post.archive();
    await this.postRepository.save(post);
  }
}
