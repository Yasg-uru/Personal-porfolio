import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import * as authService from "@/services/auth.service"
import type { AuthUser } from "@/features/auth/types"

export const AUTH_SESSION_QUERY_KEY = ["auth", "session"]

export const useAuthSession = () => {
  return useQuery<AuthUser | null>({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: async () => {
      try {
        const data = await authService.fetchCurrentUser()
        return data?.user ?? null
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status ?? 0
          if (status === 400 || status === 401 || status === 403 || status === 404) {
            return null
          }
        }
        throw error
      }
    },
    staleTime: 1000 * 60 * 2,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
