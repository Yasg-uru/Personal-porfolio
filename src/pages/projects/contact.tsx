"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, User, MessageSquare, CheckCircle, Phone, MapPin, Clock } from "lucide-react"

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

export type ContactFormInputs = z.infer<typeof contactFormSchema>

// Minimalistic input field component
const MinimalInputField = ({ field, label, icon: Icon, type = "text", error, rows }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const InputComponent = rows ? Textarea : Input

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="relative">
        <InputComponent
          {...field}
          type={type}
          rows={rows}
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-4 pl-12 text-white bg-blue-900/10 backdrop-blur-md border border-blue-500/10 rounded-2xl focus:border-blue-400/30 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
        />

        <motion.div
          className="absolute left-4 top-4 text-gray-400"
          animate={{
            color: isFocused ? "#60a5fa" : "#9ca3af",
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2 ml-2"
        >
          {error.message}
        </motion.p>
      )}
    </motion.div>
  )
}

// Success message component
const SuccessMessage = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center bg-blue-900/20 backdrop-blur-md rounded-2xl border border-blue-500/10"
  >
    <div className="text-center">
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="mx-auto mb-4">
        <CheckCircle className="h-16 w-16 text-blue-400" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
      <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon!</p>
    </div>
  </motion.div>
)

// Contact info card component
const ContactInfoCard = ({ icon: Icon, label, value }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.035 }}
  >
    <Card className="relative group w-full h-32 flex flex-col items-center justify-center space-y-3 rounded-2xl border border-blue-500/10 bg-blue-900/10 backdrop-blur-md shadow-md transition-all duration-300 hover:border-blue-400/30">
      {/* Background lighting on hover */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: "radial-gradient(300px circle at center, rgba(59, 130, 246, 0.12), transparent 40%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Icon circle */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 shadow-inner text-2xl text-blue-400">
          <Icon className="h-6 w-6" />
        </div>
        {/* Info */}
        <div className="text-center">
          <p className="text-gray-400 text-xs">{label}</p>
          <p className="text-white font-medium text-sm">{value}</p>
        </div>
      </div>
    </Card>
  </motion.div>
)

const Contact = () => {
  const { toast } = useToast()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormInputs) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      console.log("Form data:", data)
      setIsSubmitted(true)
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      setTimeout(() => {
        setIsSubmitted(false)
        reset()
      }, 3000)
    } catch (error) {
      toast({
        title: "Failed to send message",
        variant: "destructive",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-xl md:2xl font-bold   text-[#64ffda]  mb-4">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's collaborate and create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <ContactInfoCard icon={Mail} label="Email" value="yashpawar12122004@gmail.com" />
              <ContactInfoCard icon={Phone} label="Phone" value="+91 79993 79411" />
              <ContactInfoCard icon={MapPin} label="Location" value="Madhya Pradesh, India" />
              <ContactInfoCard icon={Clock} label="Response Time" value="Within 24 hours" />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Card className="relative group w-full p-8 rounded-2xl border border-blue-500/10 bg-blue-900/10 backdrop-blur-md shadow-md transition-all duration-300 hover:border-blue-400/30">
                  {/* Background lighting on hover */}
                  <motion.div
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: "radial-gradient(500px circle at center, rgba(59, 130, 246, 0.12), transparent 40%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2">Send Message</h2>
                      <p className="text-gray-400">Fill out the form below and I'll get back to you soon!</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <MinimalInputField field={field} label="Your Name" icon={User} error={errors.name} />
                        )}
                      />

                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <MinimalInputField
                            field={field}
                            label="Email Address"
                            icon={Mail}
                            type="email"
                            error={errors.email}
                          />
                        )}
                      />

                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <MinimalInputField
                            field={field}
                            label="Your Message"
                            icon={MessageSquare}
                            error={errors.message}
                            rows={4}
                          />
                        )}
                      />

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:border-blue-400/30 hover:from-blue-600/30 hover:to-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {isLoading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </div>
                      </motion.button>
                    </form>
                  </div>

                  {/* Success overlay */}
                  <AnimatePresence>{isSubmitted && <SuccessMessage />}</AnimatePresence>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
