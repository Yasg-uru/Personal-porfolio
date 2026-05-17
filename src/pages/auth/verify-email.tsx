import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, KeyRound } from "lucide-react"
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
import { useResendVerificationCode, useVerifyEmail } from "@/hooks/mutations/useAuthMutations"

const verifySchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  otp: z.string().length(6, { message: "Enter the 6-digit code sent to your inbox." }),
})

type VerifyFormValues = z.infer<typeof verifySchema>

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const verifyMutation = useVerifyEmail()
  const resendMutation = useResendVerificationCode()

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      otp: "",
    },
  })

  const onSubmit = (data: VerifyFormValues) => {
    verifyMutation.mutate(data, {
      onSuccess: () => {
        toast({
          className: "border border-white/10 bg-black/90 text-white",
          title: "Email verified",
          description: "You can sign in now.",
        })
        navigate(`/login?email=${encodeURIComponent(data.email)}`)
      },
      onError: (error) => {
        toast({
          title: "Verification failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      },
    })
  }

  const handleResend = () => {
    const email = form.getValues("email")
    if (!email) {
      toast({ title: "Enter an email first", variant: "destructive" })
      return
    }

    resendMutation.mutate(email, {
      onSuccess: () => {
        toast({ title: "OTP resent", description: "Check your inbox for the new code." })
      },
      onError: (error) => {
        toast({
          title: "Could not resend OTP",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <AuthShell
      eyebrow="Verify your email"
      title="Finish setup with the one-time code sent to your inbox."
      description="Enter the 6-digit code sent to your email to complete verification."
      footer={
        <div className="flex flex-col gap-3 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Back to sign in
          </Link>
          <button type="button" onClick={handleResend} className="font-medium text-primary underline-offset-4 hover:underline">
            {resendMutation.isPending ? "Resending..." : "Resend code"}
          </button>
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
                    <Input className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:ring-primary" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/85">Verification code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      className="h-12 border-white/10 bg-white/5 pl-10 text-center tracking-[0.45em] text-white placeholder:text-white/30 focus-visible:ring-primary"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="123456"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify email"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

export default VerifyEmailPage
