import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(1000, {
      message: "Message must not be longer than 1000 characters.",
    }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setIsLoading(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("http://localhost:5000/api/notification/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      form.reset()

      // Close dialog after 2 seconds
      setTimeout(() => {
        onOpenChange(false)
        setSubmitStatus("idle")
      }, 2000)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="animated-border-card bg-card border border-border shadow-2xl max-w-md overflow-hidden">
        <style>{`
          @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }

          @keyframes rotate-angle {
            from { --angle: 0deg; }
            to { --angle: 360deg; }
          }

          @keyframes borderGlow {
            0% {
              box-shadow: 0 0 5px hsl(var(--primary)), inset 0 0 5px hsl(var(--primary) / 0.3);
            }
            50% {
              box-shadow: 0 0 15px hsl(var(--primary)), inset 0 0 10px hsl(var(--primary) / 0.5);
            }
            100% {
              box-shadow: 0 0 5px hsl(var(--primary)), inset 0 0 5px hsl(var(--primary) / 0.3);
            }
          }
          
          .animated-border-card::after {
            content: "";
            position: absolute;
            inset: 0;
            padding: 2px;
            border-radius: inherit;
            background: conic-gradient(
              from var(--angle),
              transparent 70%,
              hsl(var(--primary)) 90%,
              hsl(var(--primary)) 100%
            );
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: 50;
            animation: rotate-angle 3s linear infinite;
            filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.8));
          }

          .input-animated-border {
            position: relative;
            border-radius: 0.75rem;
            transition: all 0.3s ease;
          }

          .input-animated-border:focus-within::after {
            content: "";
            position: absolute;
            inset: -1px;
            padding: 2px;
            border-radius: inherit;
            background: conic-gradient(
              from var(--angle),
              transparent 70%,
              hsl(var(--primary)) 90%,
              hsl(var(--primary)) 100%
            );
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: 10;
            animation: rotate-angle 3s linear infinite;
            filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.8));
          }

          input:focus,
          textarea:focus {
            outline: none !important;
            border-color: transparent !important;
            box-shadow: none !important;
          }
        `}</style>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Mail className="h-6 w-6 text-primary" />
              </motion.div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                Let's Connect
              </DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground">
              Send me a message and I'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>

          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 mb-4"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-green-500 font-semibold">Message Sent!</p>
                <p className="text-green-500/80 text-sm">Thanks for reaching out. I'll be in touch soon.</p>
              </div>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-4"
            >
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-red-500 font-semibold">Error</p>
                <p className="text-red-500/80 text-sm">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Your Name</FormLabel>
                      <FormControl>
                        <div className="input-animated-border">
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="w-full bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground rounded-xl px-3 py-2 focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <div className="input-animated-border">
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            className="w-full bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground rounded-xl px-3 py-2 focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Message</FormLabel>
                      <FormControl>
                        <div className="input-animated-border">
                          <Textarea
                            placeholder="Tell me about your project or just say hi..."
                            {...field}
                            rows={4}
                            className="w-full bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground rounded-xl px-3 py-2 focus:outline-none transition-all duration-300 resize-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex gap-3 pt-2"
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false)
                    form.reset()
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                      />
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-muted-foreground text-center mt-4"
          >
            I typically respond within 24 hours.
          </motion.p>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
