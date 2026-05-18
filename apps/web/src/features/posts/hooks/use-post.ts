import { orpcQueryClient } from '@/core/clients/orpc-client';
import { useMutation } from '@tanstack/react-query';

export const usePost = () => {
  return useMutation(orpcQueryClient.post.getById.mutationOptions());
};
