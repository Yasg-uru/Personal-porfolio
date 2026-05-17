export interface AuthUser {
  _id: string;
  email: string;
  username: string;
  profileUrl: string;
  isVerified?: boolean;
  role?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username?: string;
  profileUrl?: FileList | null;
}

export interface VerifyEmailCredentials {
  email: string;
  otp: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  password: string;
}
