export type TokenStorage = {
  getToken: () => Promise<string | null> | string | null
  setToken: (token: string) => Promise<void> | void
  removeToken: () => Promise<void> | void
}
