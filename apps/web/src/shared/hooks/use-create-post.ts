import { useMutation } from '@tanstack/react-query';
import { orpcQueryClient } from '../../core/clients/orpc-client';

export const useCreatePost = () => {
  return useMutation(orpcQueryClient.post.create.mutationOptions());
};
