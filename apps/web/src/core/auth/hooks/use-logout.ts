import { orpcQueryClient } from '@/core/clients/orpc-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useAuth } from '@workspace/auth-react';

export const useLogout = () => {
  const logout = useAuth(s => s.logout);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await logout();
      await router.invalidate();
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: orpcQueryClient.user.getMyProfile.queryKey(),
      });
    },
  });
};
