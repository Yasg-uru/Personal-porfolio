import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { Icons } from "@/components/ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { createAccount } from "@/state/slices/authslice/authSlice";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  profileUrl: z.any().optional(), // Allow files
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.auth);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      profileUrl: null,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // Create FormData
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profileUrl) {
      formData.append("profileUrl", data.profileUrl[0]); // File input contains an array
    }
    dispatch(createAccount(formData))
      .unwrap()
      .then(() => {
        toast({
          title: "Registration Successful",
          description: "You've been automatically logged in. Welcome!",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });

    navigate("/");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
      form.setValue("profileUrl", event.target.files); // Update the form state with the file
    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center p-8">
      <Card className="w-[350px] mx-auto mt-10 bg-black border border-gray-700 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-lg font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm">
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
                    <FormLabel className="text-white text-sm">
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
                          className="flex items-center justify-center w-full h-full bg-gray-800 rounded-full cursor-pointer overflow-hidden hover:ring-2 hover:ring-blue-500"
                        >
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-10 w-10 text-gray-500" />
                          )}
                        </label>
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-400 text-xs">
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
                    <FormLabel className="text-white text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-black text-white border border-gray-600 focus:ring focus:ring-blue-500"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400 text-xs">
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
                    <FormLabel className="text-white text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-black text-white border border-gray-600 focus:ring focus:ring-blue-500"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400 text-xs">
                      Must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-white text-black font-semibold hover:bg-gray-400 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-400">
            If you register, you can skip the hassle of logging in. Our quick
            and seamless account creation process ensures a personalized
            portfolio experience just for you.
          </p>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 underline underline-offset-4 hover:text-blue-500"
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
