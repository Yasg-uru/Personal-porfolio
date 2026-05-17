import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { z } from "zod"
import { Eye, EyeOff, Mail, LockKeyhole, User } from "lucide-react"
import AuthShell from "@/features/auth/components/auth-shell"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useRegister } from "@/hooks/mutations/useAuthMutations"

export const registerSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  profileUrl: z.any().optional(),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterUser: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const registerMutation = useRegister()
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      profileUrl: null,
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("password", data.password)
    if (data.profileUrl?.[0]) {
      formData.append("profileUrl", data.profileUrl[0])
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        toast({
          className: "border border-white/10 bg-black/90 text-white",
          title: "Account created",
          description: "Check your email for the OTP verification code.",
        })
        navigate(`/verify-email?email=${encodeURIComponent(data.email)}`)
      },
      onError: (error) => {
        toast({
          title: "Registration failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      },
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
      form.setValue("profileUrl", event.target.files)
    }
  }

  return (
    <AuthShell
      eyebrow="Create account"
      title="Create your account"
      description="Create an account to access portfolio features."
      footer={
        <p className="text-sm text-white/65">
          Already verified?{" "}
          <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <Avatar className="h-14 w-14 border border-white/10">
              <AvatarImage src={previewUrl ?? undefined} alt="Profile preview" />
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Profile picture</p>
              <p className="text-xs text-white/55">Optional.</p>
            </div>
            <label className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10">
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/85">Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      placeholder="Your display name"
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
                <FormDescription className="text-white/45">Used to sign in and recover your account.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/85">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input
                      className="h-12 border-white/10 bg-white/5 pl-10 pr-11 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                <FormDescription className="text-white/45">Minimum 8 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              className="h-12 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating account..." : "Create account"}
            </Button>
          </motion.div>
        </form>
      </Form>
    </AuthShell>
  )
}

export default RegisterUser
