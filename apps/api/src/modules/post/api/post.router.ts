import { authed, pub } from "@/orpc";

import { postService } from "../post.service";

export const postRouter = pub.post.router({
  create: authed.post.create.handler(async ({ input }) => {
    return postService.create(input);
  }),

  getById: pub.post.getById.handler(async ({ input }) => {
    return postService.getById(input.id);
  }),
});
