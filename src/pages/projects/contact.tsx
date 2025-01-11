import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { sendMessage } from "@/state/slices/authslice/authSlice";

// Define Zod schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name is too long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

// Form field types
export type ContactFormInputs = z.infer<typeof contactFormSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
 
      dispatch(sendMessage(data))
        .unwrap()
        .then(() => {
          toast({
            title: "message send successfully",
          });
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });

      reset();
   
  };

  return (
    <div 
      id="contact"
      className="min-h-screen justify-center items-center bg-black pt-5"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Get in Touch</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Enter your name"
                  className={`w-full rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } bg-black px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 ${
                    errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } bg-black px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Message
            </label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="message"
                  placeholder="Write your message here"
                  rows={4}
                  className={`w-full rounded-md border ${
                    errors.message ? "border-red-500" : "border-gray-700"
                  } bg-black px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
              )}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            {!isLoading ? "Send Message" : "...Sending"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
