import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import * as authService from "@/services/auth.service"
import type {
  ForgotPasswordCredentials,
  LoginCredentials,
  ResetPasswordCredentials,
  VerifyEmailCredentials,
} from "@/features/auth/types"
import type { ContactFormInputs } from "@/pages/components/contact"
import { AUTH_SESSION_QUERY_KEY } from "@/hooks/queries/useAuth"

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => authService.register(formData),
    onSuccess: () => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, null)
    },
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data: any) => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, data?.user ?? null)
    },
  })
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (credentials: VerifyEmailCredentials) => authService.verifyEmail(credentials),
  })
}

export const useResendVerificationCode = () => {
  return useMutation({
    mutationFn: (email: string) => authService.resendVerificationCode(email),
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (credentials: ForgotPasswordCredentials) => authService.forgotPassword(credentials),
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (credentials: ResetPasswordCredentials) => authService.resetPassword(credentials),
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, null)
      queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY })
    },
  })
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (message: ContactFormInputs) => authService.sendMessage(message),
  })
}
