import { IPostRepository } from "../repositories/IPostRepository";
import { Post } from "../entities/Post";

export class GetPost {
  constructor(private postRepository: IPostRepository) {}

  async execute(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }
}
