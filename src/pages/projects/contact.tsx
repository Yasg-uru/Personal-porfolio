import React, { useState } from "react";
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

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

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

  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (data: ContactFormInputs) => {
    dispatch(sendMessage(data))
      .unwrap()
      .then(() => {
        toast({ title: "Message sent successfully" });
      })
      .catch((error) => {
        toast({ title: error, variant: "destructive" });
      });

    reset();
    setValues({ name: "", email: "", message: "" });
  };

  return (
    <div id="contact" className="min-h-screen flex justify-center items-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#112240]/50 backdrop-blur-md shadow-lg rounded-xl p-8 max-w-lg w-full border border-[#64ffda]/20"
      >
        <h2 className="text-3xl font-bold text-center text-[#64ffda] mb-6">Get in Touch</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  value={values.name}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("name", e.target.value);
                  }}
                  className="w-full px-4 py-3 text-white bg-transparent border border-gray-600 rounded-md focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda] focus:outline-none peer"
                />
              )}
            />
            <label
              htmlFor="name"
              className={`absolute left-4 text-gray-400 text-sm transition-all ${
                values.name ? "top-0 text-[#64ffda] text-xs" : "top-4 text-base"
              }`}
            >
              Name
            </label>
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div className="relative">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("email", e.target.value);
                  }}
                  className="w-full px-4 py-3 text-white bg-transparent border border-gray-600 rounded-md focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda] focus:outline-none peer"
                />
              )}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 text-gray-400 text-sm transition-all ${
                values.email ? "top-0 text-[#64ffda] text-xs" : "top-4 text-base"
              }`}
            >
              Email
            </label>
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Message Field */}
          <div className="relative">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="message"
                  value={values.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("message", e.target.value);
                  }}
                  rows={4}
                  className="w-full px-4 py-3 text-white bg-transparent border border-gray-600 rounded-md focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda] focus:outline-none peer"
                />
              )}
            />
            <label
              htmlFor="message"
              className={`absolute left-4 text-gray-400 text-sm transition-all ${
                values.message ? "top-0 text-[#64ffda] text-xs" : "top-4 text-base"
              }`}
            >
              Message
            </label>
            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#64ffda] text-black font-bold py-3 px-6 rounded-md transition-all hover:bg-[#52e0c4]"
          >
            {!isLoading ? "Send Message" : "Sending..."}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
