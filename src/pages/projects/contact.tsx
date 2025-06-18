"use client"

import { useState, useRef, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Sparkles,
  Zap,
  Heart,
  Star,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

export type ContactFormInputs = z.infer<typeof contactFormSchema>

// Floating particle component
const FloatingParticle = ({ delay, duration, x, y, color }: any) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full opacity-60"
    style={{ left: x, top: y, backgroundColor: color }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

// Animated input field component
const AnimatedInputField = ({ field, label, icon: Icon, type = "text", error, value, onChange, rows }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    setHasValue(value && value.length > 0)
  }, [value])

  const InputComponent = rows ? Textarea : Input

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={isFocused ? { opacity: 1 } : {}}
      />

      {/* Input container */}
      <div className="relative">
        <InputComponent
          {...field}
          type={type}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-4 pl-12 text-white bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 peer "
        />

        {/* Animated icon */}
        <motion.div
          className="absolute left-4 top-4 text-gray-400"
          animate={{
            color: isFocused || hasValue ? "#06b6d4" : "#9ca3af",
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>

        {/* Floating label */}
        <motion.label
          className="absolute left-12 text-gray-400 pointer-events-none transition-all duration-300"
          animate={{
            top: isFocused || hasValue ? "0.5rem" : "1rem",
            fontSize: isFocused || hasValue ? "0.75rem" : "1rem",
            color: isFocused ? "#06b6d4" : hasValue ? "#e5e7eb" : "#9ca3af",
          }}
        >
          {label}
        </motion.label>

        {/* Focus indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
          >
            <AlertCircle className="h-4 w-4" />
            {error.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Success animation component
const SuccessAnimation = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: 2 }}
        className="mx-auto mb-4"
      >
        <CheckCircle className="h-16 w-16 text-green-400" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold text-white mb-2"
      >
        Message Sent!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-gray-400"
      >
        Thank you for reaching out. I'll get back to you soon!
      </motion.p>
    </div>
  </motion.div>
)

const Contact = () => {
  const { toast } = useToast()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]))

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const watchedValues = watch()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
    mouseX.set(x / rect.width - 0.5)
    mouseY.set(y / rect.height - 0.5)
  }

  const onSubmit = async (data: ContactFormInputs) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      // Replace with actual API call
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            duration={3 + Math.random() * 2}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
            color={i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#8b5cf6" : "#ec4899"}
          />
        ))}

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Mouse follower gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.h1
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Let's Talk
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-400 max-w-lg"
              >
                Have a project in mind? Let's collaborate and create something amazing together. I'm always excited to
                work on new challenges!
              </motion.p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "yashpawar12122004@gmail.com", color: "#06b6d4" },
                { icon: Phone, label: "Phone", value: "+91 79993 79411", color: "#8b5cf6" },
                { icon: MapPin, label: "Location", value: "Madhya Pradesh, India", color: "#ec4899" },
                { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "#10b981" },
              ].map(({ icon: Icon, label, value, color }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color }} />
                  </motion.div>
                  <div>
                    <p className="text-gray-400 text-sm">{label}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating icons */}
            <div className="relative">
              {[
                { icon: Sparkles, delay: 0, x: "10%", y: "20%" },
                { icon: Zap, delay: 1, x: "80%", y: "10%" },
                { icon: Heart, delay: 2, x: "20%", y: "80%" },
                { icon: Star, delay: 3, x: "90%", y: "70%" },
              ].map(({ icon: Icon, delay, x, y }, index) => (
                <motion.div
                  key={index}
                  className="absolute opacity-20"
                  style={{ left: x, top: y }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="h-8 w-8 text-cyan-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            <motion.div
              className="bg-gray-900/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              style={{
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  background: [
                    "linear-gradient(0deg, transparent, rgba(6, 182, 212, 0.3), transparent)",
                    "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
                    "linear-gradient(180deg, transparent, rgba(236, 72, 153, 0.3), transparent)",
                    "linear-gradient(270deg, transparent, rgba(6, 182, 212, 0.3), transparent)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Form content */}
              <div className="relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Send Message</h2>
                  <p className="text-gray-400">Fill out the form below and I'll get back to you soon!</p>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <AnimatedInputField
                        field={field}
                        label="Your Name"
                        icon={User}
                        error={errors.name}
                        value={watchedValues.name}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <AnimatedInputField
                        field={field}
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        error={errors.email}
                        value={watchedValues.email}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <AnimatedInputField
                        field={field}
                        label="Your Message"
                        icon={MessageSquare}
                        error={errors.message}
                        value={watchedValues.message}
                        onChange={field.onChange}
                        rows={4}
                      />
                    )}
                  />

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative flex items-center justify-center gap-2">
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
              <AnimatePresence>{isSubmitted && <SuccessAnimation />}</AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact