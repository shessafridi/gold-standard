import { orpcQueryClient } from '@/core/clients/orpc-client';
import { useMutation } from '@tanstack/react-query';

export const useCreatePost = () => {
  return useMutation(orpcQueryClient.post.create.mutationOptions());
};
