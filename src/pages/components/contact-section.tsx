import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Sparkles } from "lucide-react"
import ContactDialog from "@/components/ContactDialog"

const ContactSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <>
      <section className="relative w-full py-32 px-4 overflow-hidden" id="contact">
        {/* Background gradient effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"
            animate={{
              y: [0, 50, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.p
              className="text-primary text-sm sm:text-base tracking-widest uppercase font-semibold mb-4"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              CONTACT
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Let's Build Something
              <br />
              <span className="text-primary">
                Amazing Together
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              I'm always excited to work on new projects and collaborate with fellow developers. Whether you have an idea,
              a question, or just want to say hi — I'll try my best to get back to you!
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setIsContactOpen(true)}
              whileHover={{
                scale: 1.1,
                boxShadow:
                  "0 0 50px rgba(255, 0, 102, 0.7), 0 0 30px rgba(255, 0, 102, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-10 py-5 sm:px-14 sm:py-6 bg-primary text-primary-foreground font-bold text-base sm:text-lg rounded-full overflow-hidden"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-primary opacity-0 group-hover:opacity-100 -z-10"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Outer glow effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary to-pink-500 rounded-full opacity-30 blur-lg -z-20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Button content */}
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <span className="relative z-10">Get In Touch</span>
                <motion.div
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              </div>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{
                  x: [-100, 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-10 left-10 text-primary opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Mail className="h-8 w-8" />
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-10 text-pink-500 opacity-20"
            animate={{
              y: [0, 20, 0],
              rotate: [360, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
        </div>
      </section>

      {/* Contact Dialog */}
      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
    </>
  )
}

export default ContactSection
