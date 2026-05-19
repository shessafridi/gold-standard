import { useAuth } from './use-auth';

export const useAuthStatus = () => {
  const status = useAuth(s => s.status);

  return status;
};
