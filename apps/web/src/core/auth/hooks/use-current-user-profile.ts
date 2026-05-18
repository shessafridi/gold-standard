import { orpcQueryClient } from '@/core/clients/orpc-client';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUserProfile = () => {
  return useQuery(orpcQueryClient.user.getMyProfile.queryOptions());
};
