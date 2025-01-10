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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { Icons } from "@/components/ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { login } from "@/state/slices/authslice/authSlice";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.auth);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        toast({
          className: "bg-black",
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center p-8">
      <Card className="w-[350px] mx-auto mt-10 bg-black border border-gray-700 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-lg font-bold">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-black text-white border border-gray-600 focus:ring focus:ring-blue-500"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
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
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 underline underline-offset-4 hover:text-blue-500"
            >
              Sign up here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginUser;
