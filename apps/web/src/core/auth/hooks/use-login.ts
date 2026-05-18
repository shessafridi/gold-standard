import { orpcQueryClient } from '@/core/clients/orpc-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@workspace/auth-react';

export const useLogin = () => {
  const loginWithToken = useAuth(s => s.loginWithToken);
  const queryClient = useQueryClient();

  return useMutation(
    orpcQueryClient.auth.login.mutationOptions({
      onSuccess: async data => {
        if (!data.token) throw new Error('Token not found in response');
        await loginWithToken(data.token);
        queryClient.invalidateQueries({
          queryKey: orpcQueryClient.user.getMyProfile.queryKey(),
        });
      },
    })
  );
};
