import { useMutation } from '@tanstack/react-query';
import { orpcQueryClient } from '@/core/clients/orpc-client';

export const useRegisterUser = () => {
  return useMutation(orpcQueryClient.auth.registerUser.mutationOptions());
};
