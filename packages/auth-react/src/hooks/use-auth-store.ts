import { useContext } from 'react';

import { AuthContext } from '../auth-provider';

export function useAuthStore() {
  const store = useContext(AuthContext);
  if (!store) throw new Error('useAuth must be used within AuthProvider');
  return store;
}
