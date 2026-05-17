import { useMutation } from "@tanstack/react-query"
import * as authService from "@/services/auth.service"
import type { LoginFormValues } from "@/pages/auth/login"
import type { ContactFormInputs } from "@/pages/components/contact"

export const useRegister = () => {
  return useMutation({
    mutationFn: (formData: FormData) => authService.register(formData),
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginFormValues) => authService.login(credentials),
  })
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (message: ContactFormInputs) => authService.sendMessage(message),
  })
}
