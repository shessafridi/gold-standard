import type { TokenStorage } from '@workspace/auth-react';

const TOKEN_STORAGE_KEY = 'auth-token';

export const browserTokenStorage: TokenStorage = {
  getToken: () => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },
  removeToken: () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};
