import React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { z } from "zod"
import { Eye, EyeOff, Mail, LockKeyhole, Sparkles } from "lucide-react"
import AuthShell from "@/features/auth/components/auth-shell"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useLogin } from "@/hooks/mutations/useAuthMutations"

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
})

export type LoginFormValues = z.infer<typeof loginSchema>

const LoginUser: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { toast } = useToast()
  const loginMutation = useLogin()
  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast({
          className: "border border-white/10 bg-black/90 text-white",
          title: "Welcome back",
          description: "Your session is ready.",
        })
        navigate("/")
      },
      onError: (error) => {
        toast({
          title: "Login failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <AuthShell
      eyebrow="Secure access"
      title="Sign in and continue where you left off."
      description="Sign in to your account."
      footer={
        <div className="flex flex-col gap-3 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Need an account?{" "}
            <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
          <Link to="/forgot-password" className="font-medium text-primary underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </div>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/85">Email address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-3">
                  <FormLabel className="text-white/85">Password</FormLabel>
                  <Link to="/forgot-password" className="text-xs text-primary/90 hover:underline">
                    Recover account
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      className="h-12 border-white/10 bg-white/5 pl-10 pr-11 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white/70"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              className="h-12 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              ) : null}
              Continue
            </Button>
          </motion.div>
        </form>
      </Form>
    </AuthShell>
  )
}

export default LoginUser
