import { post } from "@/services/apiClient"
import { API_ROUTES } from "@/lib/apiRoutes"
import type { LoginFormValues } from "@/pages/auth/login"
import type { ContactFormInputs } from "@/pages/components/contact"

export async function register(formData: FormData) {
  const data = await post(API_ROUTES.auth.register, formData, { withCredentials: true })
  return data
}

export async function login(credentials: LoginFormValues) {
  const data = await post(API_ROUTES.auth.login, credentials, { withCredentials: true })
  return data
}

export async function sendMessage(message: ContactFormInputs) {
  const data = await post(API_ROUTES.auth.sendMessage, message, { withCredentials: true })
  return data
}

export default {
  register,
  login,
  sendMessage,
}
