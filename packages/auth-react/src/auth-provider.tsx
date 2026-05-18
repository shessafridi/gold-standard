import { createContext, useEffect, useRef, type ReactNode } from "react"
import type { TokenStorage } from "./types/token-storage"
import { type AuthStore, createAuthStore } from "./auth-store"

export const AuthContext = createContext<AuthStore | null>(null)

export function AuthProvider({
  storage,
  children,
}: {
  storage: TokenStorage
  children: ReactNode
}) {
  const storeRef = useRef<AuthStore | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createAuthStore(storage)
  }

  useEffect(() => {
    storeRef.current!.getState().hydrate()
  }, [])

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  )
}
