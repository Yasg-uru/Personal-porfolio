import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import * as z from "zod"
import { Icons } from "@/components/ui/icons"
import { Link } from "react-router-dom"
import { User } from "lucide-react"
import { useRegister } from "@/hooks/mutations/useAuthMutations"

export const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  profileUrl: z.any().optional(),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterUser: React.FC = () => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const { toast } = useToast()
  const registerMutation = useRegister()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      profileUrl: null,
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    if (data.profileUrl) {
      formData.append("profileUrl", data.profileUrl[0])
    }
    registerMutation.mutate(formData, {
      onSuccess: () => {
        toast({
          className: "bg-background text-foreground border border-border",
          title: "Registration Successful",
          description: "You've been automatically logged in. Welcome!",
        })
      },
      onError: (error) => {
        toast({
          title: "Registration Failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      },
    })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
      form.setValue("profileUrl", event.target.files); // Update the form state with the file
    }
  };

  return (
    <div className="bg-background min-h-screen flex justify-center items-center p-8 text-foreground transition-colors duration-300">
      <Card className="w-[350px] mx-auto mt-10 bg-card border border-border rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-foreground text-lg font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Get started with our portfolio platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="profileUrl"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Profile Picture
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-24 h-24 mx-auto">
                        <input
                          type="file"
                          accept="image/*"
                          id="profile-picture"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="profile-picture"
                          className="flex items-center justify-center w-full h-full bg-muted rounded-full cursor-pointer overflow-hidden hover:ring-2 hover:ring-primary"
                        >
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-10 w-10 text-muted-foreground" />
                          )}
                        </label>
                      </div>
                    </FormControl>
                    <FormDescription className="text-muted-foreground text-xs">
                      Choose a profile picture (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background text-foreground border border-border focus:ring focus:ring-primary"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground text-xs">
                      We'll never share your email with anyone else.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background text-foreground border border-border focus:ring focus:ring-primary"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground text-xs">
                      Must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            If you register, you can skip the hassle of logging in. Our quick
            and seamless account creation process ensures a personalized
            portfolio experience just for you.
          </p>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Log in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterUser;
