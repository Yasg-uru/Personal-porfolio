
import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  // useScroll,
  useAnimation,
} from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaCode, FaRocket } from "react-icons/fa"
import { Typewriter } from "react-simple-typewriter"
import { Pen, Code2, Sparkles, Zap, Coffee, Terminal, ChevronDown, Mail, MapPin, Calendar } from "lucide-react"
import YashChoudhary from "../../assets/my_images/yash-choudhary-image .jpg"
import YashChoudharyResume from "../../assets/YashChoudharyResume.pdf"
// Particle component for background animation
const Particle = ({ }: { index: number }) => {
  const randomDelay = Math.random() * 2
  const randomDuration = 3 + Math.random() * 4
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100

  return (
    <motion.div
      className="absolute w-1 h-1 bg-[#64ffda] rounded-full opacity-30"
      initial={{
        x: `${randomX}vw`,
        y: `${randomY}vh`,
        scale: 0,
      }}
      animate={{
        y: [`${randomY}vh`, `${randomY - 20}vh`, `${randomY}vh`],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

// Floating icon component
const FloatingIcon = ({
  icon: Icon,
  delay,
  x,
  y,
  color = "#64ffda",
}: {
  icon: any
  delay: number
  x: string
  y: string
  color?: string
}) => (
  <motion.div
    className="absolute opacity-20"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 360],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    <Icon size={24} style={{ color }} />
  </motion.div>
)

// Glitch text component
const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      className={`relative ${className}`}
      animate={
        isGlitching
          ? {
              x: [0, -2, 2, -1, 1, 0],
              textShadow: ["0 0 0 transparent", "2px 0 0 #ff0000, -2px 0 0 #00ffff", "0 0 0 transparent"],
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [, setImageLoaded] = useState(false)
  const controls = useAnimation()

  // Scroll animation
  // const { scrollYProgress } = useScroll()
  // const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Mouse movement animation values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
  //   stiffness: 400,
  //   damping: 25,
  // })
  // const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
  //   stiffness: 400,
  //   damping: 25,
  // })

  // Image 3D rotation
  const imageRotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const imageRotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  // State to manage the cyclic text
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0)
  const descriptions = [
    "An aspiring software engineer with the ability to grow as an individual and learn in the surrounding of talented people.",
    "Specialized in building exceptional digital experiences with modern technologies.",
    "A problem solver with a passion for solving complex LeetCode problems. Solved 800+ problems!",
    "Writes everything in the latest technologies like TypeScript and currently working on CrushSphere.",
    "Passionate about creating scalable applications and contributing to open source projects.",
  ]

  // Change the description every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptionIndex((prev) => (prev + 1) % descriptions.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const relativeX = event.clientX - rect.left
      const relativeY = event.clientY - rect.top

      setMousePosition({ x: relativeX, y: relativeY })
      x.set(relativeX / rect.width - 0.5)
      y.set(relativeY / rect.height - 0.5)
    },
    [x, y],
  )

  // Animate on mount
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    })
  }, [controls])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Floating icons */}
      <FloatingIcon icon={Code2} delay={0} x="10%" y="20%" />
      <FloatingIcon icon={Coffee} delay={1} x="85%" y="15%" color="#fbbf24" />
      <FloatingIcon icon={Terminal} delay={2} x="15%" y="70%" color="#8b5cf6" />
      <FloatingIcon icon={Zap} delay={3} x="80%" y="60%" color="#f59e0b" />
      <FloatingIcon icon={Sparkles} delay={4} x="5%" y="45%" color="#ec4899" />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="container mx-auto px-4 pt-20 pb-16 relative z-10"
      >
        {/* Mouse gradient follower */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: `
                  radial-gradient(
                    600px circle at ${mousePosition.x}px ${mousePosition.y}px,
                    rgba(100, 255, 218, 0.1),
                    rgba(29, 78, 216, 0.05),
                    transparent 40%
                  )
                `,
              }}
            />
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Text content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={controls} className="space-y-8 max-w-2xl">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                className="text-2xl"
              >
                👋
              </motion.div>
              <p className="text-[#64ffda] text-lg font-medium">Hello World! My name is</p>
            </motion.div>

            {/* Name with glitch effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl lg:text-8xl font-bold"
            >
              <GlitchText className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Yash Choudhary
              </GlitchText>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-gray-400"
            >
              I love to{" "}
              <motion.span
                animate={{
                  color: ["#64ffda", "#fbbf24", "#ec4899", "#8b5cf6", "#64ffda"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="relative"
              >
                explore & code
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#64ffda] to-transparent opacity-20 blur-lg"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.span>
              !
            </motion.h2>

            {/* Typewriter description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-[#64ffda] text-xl font-medium flex items-start gap-2 min-h-[120px]"
            >
              <div className="flex-1">
                <Typewriter
                  words={[descriptions[currentDescriptionIndex]]}
                  loop={false}
                  typeSpeed={50}
                  deleteSpeed={30}
                  cursor
                  cursorStyle="|"
                />
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Pen className="h-5 w-5 text-[#64ffda] mt-1" />
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold text-[#64ffda]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  1000+
                </motion.div>
                <div className="text-gray-400 text-sm">Problems Solved</div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold text-[#fbbf24]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  30+
                </motion.div>
                <div className="text-gray-400 text-sm">Projects Built</div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold text-[#ec4899]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  1+
                </motion.div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(100, 255, 218, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#64ffda] text-black font-semibold rounded-lg hover:bg-[#4fd1c7] transition-all duration-300 flex items-center gap-2"
              >
                <FaRocket />
                View My Work
              </motion.button>
              <a
                            href={YashChoudharyResume} // Use the imported PDF file directly
                            download="YashChoudharyResume.pdf" // Correct filename for download
                            // className="border border-[#64ffda] text-[#64ffda] px-4 py-2 rounded hover:bg-[#64ffda]/10 transition-colors"
                          >
                            
                          
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "#64ffda" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-[#64ffda] transition-all duration-300 flex items-center gap-2"
              >
                <FaDownload />
                Download CV
              </motion.button>
              </a>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap gap-6 text-gray-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                yashpawar12122004@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                India
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Available for work
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Developer image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-96 h-96 border border-[#64ffda]/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute w-80 h-80 border border-[#fbbf24]/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute w-64 h-64 border border-[#ec4899]/20 rounded-full"
              />
            </div>

            {/* Developer image container */}
            <motion.div
              style={{
                rotateX: imageRotateX,
                rotateY: imageRotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-[#64ffda] shadow-2xl"
                style={{
                  boxShadow: "0 0 50px rgba(100, 255, 218, 0.3)",
                }}
              >
                {/* Placeholder for developer image */}
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="w-full h-full bg-gradient-to-br from-[#64ffda]/20 to-[#1e40af]/20 flex items-center justify-center relative overflow-hidden"
                >
                  {/* You can replace this with an actual image */}
                  <img
                    src={YashChoudhary}
                    alt="Yash Choudhary - Developer"
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Overlay effects */}
                  <motion.div
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute inset-0 bg-gradient-to-tr from-[#64ffda]/20 to-transparent"
                  />
                </motion.div>

                {/* Floating badges around image */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-4 -right-4 bg-[#64ffda] text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  <FaCode className="inline mr-1" />
                  Developer
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-[#fbbf24] text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  <Sparkles className="inline mr-1 h-3 w-3" />
                  Creative
                </motion.div>
              </motion.div>

              {/* Floating elements around image */}
              <motion.div
                animate={{
                  x: [0, 20, 0],
                  y: [0, -15, 0],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-10 -left-10 text-4xl"
              >
                💻
              </motion.div>

              <motion.div
                animate={{
                  x: [0, -15, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute bottom-10 -right-10 text-4xl"
              >
                🚀
              </motion.div>

              <motion.div
                animate={{
                  x: [0, 10, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                className="absolute top-1/2 -right-16 text-3xl"
              >
                ⚡
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-400 text-sm">Scroll to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronDown className="h-6 w-6 text-[#64ffda]" />
          </motion.div>
        </motion.div>

        {/* Enhanced Social Links */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-50"
        >
          <motion.a
            href="https://github.com/Yasg-uru"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              color: "#64ffda",
              boxShadow: "0 0 20px rgba(100, 255, 218, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-[#64ffda] transition-all duration-300 p-3 rounded-full border border-gray-700 hover:border-[#64ffda]"
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/yash-choudhary-28766a259"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              color: "#0077b5",
              boxShadow: "0 0 20px rgba(0, 119, 181, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-[#0077b5] transition-all duration-300 p-3 rounded-full border border-gray-700 hover:border-[#0077b5]"
          >
            <FaLinkedin size={24} />
          </motion.a>
          <motion.a
            href="https://x.com/yashc442"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              color: "#1da1f2",
              boxShadow: "0 0 20px rgba(29, 161, 242, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-[#1da1f2] transition-all duration-300 p-3 rounded-full border border-gray-700 hover:border-[#1da1f2]"
          >
            <FaTwitter size={24} />
          </motion.a>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 2, duration: 1 }}
            className="w-[2px] bg-gradient-to-b from-[#64ffda] to-transparent"
          />
        </motion.div>

        {/* Right side email */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
          className="fixed right-8 bottom-32 flex flex-col items-center gap-6 z-50"
        >
          <motion.a
            href="mailto:yashpawar12122004@gmail.com"
            whileHover={{ scale: 1.05, color: "#64ffda" }}
            className="text-gray-400 hover:text-[#64ffda] transition-all duration-300 writing-mode-vertical text-sm tracking-widest"
            style={{ writingMode: "vertical-rl" }}
          >
            yashpawar12122004@gmail.com
          </motion.a>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="w-[2px] bg-gradient-to-t from-[#64ffda] to-transparent"
          />
        </motion.div>
      </section>
    </div>
  )
}

export default Hero
