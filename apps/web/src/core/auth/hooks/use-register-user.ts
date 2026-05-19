import { orpcQueryClient } from '@/core/clients/orpc-client';
import { useMutation } from '@tanstack/react-query';

export const useRegisterUser = () => {
  return useMutation(orpcQueryClient.auth.registerUser.mutationOptions());
};
