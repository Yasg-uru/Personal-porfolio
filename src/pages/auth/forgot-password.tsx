import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail } from "lucide-react"
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
import { useForgotPassword } from "@/hooks/mutations/useAuthMutations"

const forgotSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
})

type ForgotFormValues = z.infer<typeof forgotSchema>

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const forgotMutation = useForgotPassword()

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = (data: ForgotFormValues) => {
    forgotMutation.mutate(data, {
      onSuccess: () => {
        toast({ title: "Reset link sent", description: "Check your inbox for the password reset link." })
        navigate("/login")
      },
      onError: (error) => {
        toast({
          title: "Reset request failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <AuthShell
      eyebrow="Recover access"
      title="We’ll send a reset link to your email."
      description="Enter your email to receive a password reset link."
      footer={
        <div className="flex items-center justify-between text-sm text-white/65">
          <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Back to sign in
          </Link>
          <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Create account
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
                    <Input className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:ring-primary" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            disabled={forgotMutation.isPending}
          >
            {forgotMutation.isPending ? "Sending link..." : "Send reset link"}
          </Button>
        </form>
      </Form>
    </AuthShell>
  )
}

export default ForgotPasswordPage
