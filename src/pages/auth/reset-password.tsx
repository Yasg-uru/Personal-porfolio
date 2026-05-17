import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"
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
import { useResetPassword } from "@/hooks/mutations/useAuthMutations"

const resetSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Confirm your password." }),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

type ResetFormValues = z.infer<typeof resetSchema>

const ResetPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const resetMutation = useResetPassword()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  const onSubmit = (data: ResetFormValues) => {
    if (!token) {
      toast({ title: "Missing token", variant: "destructive" })
      return
    }

    resetMutation.mutate(
      { token, password: data.password },
      {
        onSuccess: () => {
          toast({ title: "Password updated", description: "You can sign in with your new password." })
          navigate("/login")
        },
        onError: (error) => {
          toast({
            title: "Reset failed",
            description: error instanceof Error ? error.message : "Unknown error",
            variant: "destructive",
          })
        },
      }
    )
  }

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Create a new password and regain access."
      description="Set a new password for your account."
      footer={
        <div className="flex items-center justify-between text-sm text-white/65">
          <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
          <Link to="/forgot-password" className="font-medium text-primary underline-offset-4 hover:underline">
            Resend link
          </Link>
        </div>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/85">New password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      className="h-12 border-white/10 bg-white/5 pl-10 pr-11 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a new password"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/85">Confirm password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      className="h-12 border-white/10 bg-white/5 pl-10 pr-11 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat the new password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white/70"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            disabled={resetMutation.isPending || !token}
          >
            {resetMutation.isPending ? "Updating password..." : "Reset password"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

export default ResetPasswordPage
