import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import type { TokenStorage } from './types/token-storage';

type AuthStatus = 'loading' | 'ready';

type AuthState = {
  token: string | null;
  status: AuthStatus;
  isHydrating: boolean;
  loginWithToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export function createAuthStore(storage: TokenStorage) {
  return create<AuthState>()(set => ({
    token: null,
    status: 'loading',
    isHydrating: true,

    hydrate: async () => {
      set({ status: 'loading', isHydrating: true });
      const stored = await storage.getToken();
      set({ token: stored ?? null, status: 'ready', isHydrating: false });
    },

    loginWithToken: async (newToken: string) => {
      await storage.setToken(newToken);
      set({ token: newToken });
    },

    logout: async () => {
      await storage.removeToken();
      set({ token: null });
    },
  }));
}

export type AuthStore = UseBoundStore<StoreApi<AuthState>>;
