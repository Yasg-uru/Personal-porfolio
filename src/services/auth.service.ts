import { get, post } from "@/services/apiClient"
import { API_ROUTES } from "@/lib/apiRoutes"
import type {
  ForgotPasswordCredentials,
  LoginCredentials,
  ResetPasswordCredentials,
  VerifyEmailCredentials,
} from "@/features/auth/types"
import type { ContactFormInputs } from "@/pages/components/contact"

export async function fetchCurrentUser() {
  const data = await get(API_ROUTES.auth.me, { withCredentials: true })
  return data
}

export async function register(formData: FormData) {
  const data = await post(API_ROUTES.auth.register, formData)
  return data
}

export async function verifyEmail(credentials: VerifyEmailCredentials) {
  const data = await post(API_ROUTES.auth.verifyEmail, credentials)
  return data
}

export async function resendVerificationCode(email: string) {
  const data = await post(API_ROUTES.auth.resendVerification, { email })
  return data
}

export async function login(credentials: LoginCredentials) {
  const data = await post(API_ROUTES.auth.login, credentials, { withCredentials: true })
  return data
}

export async function forgotPassword(credentials: ForgotPasswordCredentials) {
  const data = await post(API_ROUTES.auth.forgotPassword, credentials)
  return data
}

export async function resetPassword(credentials: ResetPasswordCredentials) {
  const data = await post(API_ROUTES.auth.resetPassword(credentials.token), { password: credentials.password })
  return data
}

export async function logout() {
  const data = await post(API_ROUTES.auth.logout, {})
  return data
}

export async function refreshAccessToken() {
  const data = await post(API_ROUTES.auth.refreshToken, {}, { withCredentials: true })
  return data
}

export async function sendMessage(message: ContactFormInputs) {
  const data = await post(API_ROUTES.auth.sendMessage, message, { withCredentials: true })
  return data
}

export default {
  fetchCurrentUser,
  register,
  verifyEmail,
  resendVerificationCode,
  login,
  forgotPassword,
  resetPassword,
  logout,
  refreshAccessToken,
  sendMessage,
}
