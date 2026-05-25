import type { ReactNode } from 'react';
import { createContext, useEffect, useRef } from 'react';

import type { AuthStore } from './auth-store';
import type { TokenStorage } from './types/token-storage';
import { createAuthStore } from './auth-store';

export const AuthContext = createContext<AuthStore | null>(null);

export function AuthProvider({
  storage,
  children,
}: {
  storage: TokenStorage;
  children: ReactNode;
}) {
  const storeRef = useRef<AuthStore | null>(null);

  storeRef.current ??= createAuthStore(storage);

  useEffect(() => {
    void storeRef.current?.getState().hydrate();
  }, []);

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  );
}
