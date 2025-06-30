"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/state/hook"
import { sendMessage } from "@/state/slices/authslice/authSlice"

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormInputs = z.infer<typeof contactFormSchema>

const Contact: React.FC = () => {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  })

  const [values, setValues] = useState({ name: "", email: "", message: "" })

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (data: ContactFormInputs) => {
    dispatch(sendMessage(data))
      .unwrap()
      .then(() => toast({ title: "Message sent successfully" }))
      .catch((error) => toast({ title: error, variant: "destructive" }))

    reset()
    setValues({ name: "", email: "", message: "" })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <section className="container mx-auto px-4 py-24" id="contact">
      <div className="text-center mb-12 space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#64ffda] text-sm sm:text-base tracking-widest uppercase font-medium"
        >
          Contact
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-4xl font-bold text-white"
        >
          Let’s Connect
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto text-gray-400 text-sm sm:text-base"
        >
          Whether you have an idea, question, or just want to say hi — I’ll try
          my best to get back to you!
        </motion.p>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          onMouseMove={handleMouseMove}
          className="relative w-full max-w-xl p-8 space-y-6 rounded-2xl border border-blue-500/10 bg-blue-900/10 backdrop-blur-md shadow-md transition-all duration-300 group"
        >
          {/* Hover glow layer */}
          <div
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{
              background:
                "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.12), transparent 40%)",
            }}
          />

          {/* Actual form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 space-y-6"
          >
            {[
              { name: "name", type: "text", label: "Name" },
              { name: "email", type: "email", label: "Email" },
            ].map(({ name, type, label }) => (
              <div key={name} className="relative">
                <Controller
                  name={name as keyof ContactFormInputs}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id={name}
                      type={type}
                      value={values[name as keyof typeof values]}
                      onChange={(e) => {
                        field.onChange(e)
                        handleChange(name as keyof typeof values, e.target.value)
                      }}
                      className="peer w-full px-4 py-3 text-white bg-transparent border border-white/10 rounded-md focus:outline-none focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda] transition placeholder-transparent"
                    />
                  )}
                />
                <label
                  htmlFor={name}
                  className={`absolute left-4 text-sm text-gray-400 transition-all pointer-events-none ${
                    values[name as keyof typeof values]
                      ? "top-1 text-xs text-[#64ffda]"
                      : "top-3.5"
                  }`}
                >
                  {label}
                </label>
                {errors[name as keyof typeof errors] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[name as keyof typeof errors]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Message Field */}
            <div className="relative">
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("message", e.target.value)
                    }}
                    className="peer w-full px-4 py-3 text-white bg-transparent border border-white/10 rounded-md focus:outline-none focus:border-[#64ffda] focus:ring-2 focus:ring-[#64ffda] transition resize-none placeholder-transparent"
                  />
                )}
              />
              <label
                htmlFor="message"
                className={`absolute left-4 text-sm text-gray-400 transition-all pointer-events-none ${
                  values.message ? "top-1 text-xs text-[#64ffda]" : "top-3.5"
                }`}
              >
                Message
              </label>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#64ffda] text-black font-semibold py-3 px-6 rounded-md transition-all shadow-md hover:bg-[#52e0c4]"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
