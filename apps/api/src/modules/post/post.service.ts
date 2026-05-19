import { NotFoundError } from "@/shared/errors";

import type { CreatePostInput } from "@workspace/api-schemas/post";

import type { PostRepository } from "./post.repository";
import { buildPostDto } from "./post.dto";
import { postRepository } from "./post.repository";

export class PostService {
  private readonly repository: PostRepository;

  constructor(repository: PostRepository) {
    this.repository = repository;
  }

  async create(input: CreatePostInput) {
    const post = await this.repository.create({
      title: input.title,
      content: input.content,
    });

    return buildPostDto(post);
  }

  async getById(id: string) {
    const post = await this.repository.findById(id);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return buildPostDto(post);
  }
}

export const postService = new PostService(postRepository);
