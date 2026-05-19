import { useContext } from 'react';
import { useStore } from 'zustand';

import type { AuthStore } from '../auth-store';
import { AuthContext } from '../auth-provider';

export function useAuth<T>(
  selector: (state: ReturnType<AuthStore['getState']>) => T
): T {
  const store = useContext(AuthContext);
  if (!store) throw new Error('useAuth must be used within AuthProvider');
  return useStore(store, selector);
}
