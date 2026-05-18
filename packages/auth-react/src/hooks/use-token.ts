import { useAuth } from "./use-auth"

export const useToken = () => {
  const token = useAuth((s) => s.token)

  return token
}
