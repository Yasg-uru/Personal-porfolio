"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaRocket } from "react-icons/fa"
import { Typewriter } from "react-simple-typewriter"
import { ChevronDown, Mail, MapPin, Calendar } from "lucide-react"
import YashChoudhary from "../../assets/my_images/yash-choudhary-image .jpg"
import YashChoudharyResume from "../../assets/YashChoudharyResume.pdf"

const Hero: React.FC = () => {
  // State to manage the cyclic text
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0)
  const descriptions = [
    "An aspiring software engineer with the ability to grow as an individual and learn in the surrounding of talented people.",
    "Specialized in building exceptional digital experiences with modern technologies.",
    "A problem solver with a passion for solving complex LeetCode problems. Solved 800+ problems!",
    "Writes everything in the latest technologies like TypeScript and currently working on CrushSphere.",
    "Passionate about creating scalable applications and contributing to open source projects.",
  ]

  // Change the description every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptionIndex((prev) => (prev + 1) % descriptions.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/5 to-transparent" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-2xl"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl">👋</span>
              <p className="text-[#64ffda] text-lg font-medium">Hello World! My name is</p>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              Yash Choudhary
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-3xl lg:text-5xl font-bold text-gray-400"
            >
              I love to <span className="text-[#64ffda]">explore & code</span>!
            </motion.h2>

            {/* Typewriter description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-300 text-lg leading-relaxed min-h-[100px]"
            >
              <Typewriter
                words={[descriptions[currentDescriptionIndex]]}
                loop={false}
                typeSpeed={50}
                deleteSpeed={30}
                cursor
                cursorStyle="|"
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              <div className="text-center group">
                <div className="text-3xl font-bold text-[#64ffda] group-hover:scale-105 transition-transform duration-300">
                  1000+
                </div>
                <div className="text-gray-400 text-sm">Problems Solved</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-[#64ffda] group-hover:scale-105 transition-transform duration-300">
                  30+
                </div>
                <div className="text-gray-400 text-sm">Projects Built</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-[#64ffda] group-hover:scale-105 transition-transform duration-300">
                  1+
                </div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#64ffda] text-black font-semibold rounded-lg hover:bg-[#4fd1c7] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#64ffda]/25"
                >
                  <FaRocket />
                  View My Work
                </motion.button>
              </a>

              <a href={YashChoudharyResume} download="YashChoudharyResume.pdf">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-[#64ffda] hover:text-[#64ffda] transition-all duration-300 flex items-center gap-2"
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
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-wrap gap-6 text-gray-400 text-sm"
            >
              <div className="flex items-center gap-2 hover:text-[#64ffda] transition-colors duration-300">
                <Mail className="h-4 w-4" />
                yashpawar12122004@gmail.com
              </div>
              <div className="flex items-center gap-2 hover:text-[#64ffda] transition-colors duration-300">
                <MapPin className="h-4 w-4" />
                India
              </div>
              <div className="flex items-center gap-2 hover:text-[#64ffda] transition-colors duration-300">
                <Calendar className="h-4 w-4" />
                Available for work
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Developer image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Simple background circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 border border-[#64ffda]/20 rounded-full" />
            </div>

            {/* Developer image container */}
            <motion.div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-[#64ffda] shadow-2xl"
                style={{
                  boxShadow: "0 0 50px rgba(100, 255, 218, 0.3)",
                }}
              >
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="w-full h-full bg-gradient-to-br from-[#64ffda]/20 to-[#1e40af]/20 flex items-center justify-center relative overflow-hidden"
                >
                  <img
                    src={YashChoudhary || "/placeholder.svg"}
                    alt="Yash Choudhary - Developer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Simple floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute -top-4 -right-4 bg-[#64ffda] text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  Developer
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                  className="absolute -bottom-4 -left-4 bg-gray-800 text-[#64ffda] px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-[#64ffda]/30"
                >
                  Creative
                </motion.div>
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
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronDown className="h-6 w-6 text-[#64ffda]" />
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-50"
        >
          <motion.a
            href="https://github.com/Yasg-uru"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#64ffda" }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-[#64ffda] transition-all duration-300 p-3 rounded-full border border-gray-700 hover:border-[#64ffda]"
          >
            <FaGithub size={20} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/yash-choudhary-28766a259"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#64ffda" }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-[#64ffda] transition-all duration-300 p-3 rounded-full border border-gray-700 hover:border-[#64ffda]"
          >
            <FaLinkedin size={20} />
          </motion.a>

          <motion.a
            href="https://x.com/yashc442"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "#64ffda" }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-[#64ffda] transition-all duration-300 p-3 rounded-full border border-gray-700 hover:border-[#64ffda]"
          >
            <FaTwitter size={20} />
          </motion.a>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 80 }}
            transition={{ delay: 2, duration: 1 }}
            className="w-[1px] bg-gradient-to-b from-[#64ffda] to-transparent"
          />
        </motion.div>

        {/* Right side email */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="fixed right-8 bottom-32 flex flex-col items-center gap-6 z-50"
        >
          <motion.a
            href="mailto:yashpawar12122004@gmail.com"
            whileHover={{ scale: 1.05, color: "#64ffda" }}
            className="text-gray-400 hover:text-[#64ffda] transition-all duration-300 text-sm tracking-widest"
            style={{ writingMode: "vertical-rl" }}
          >
            yashpawar12122004@gmail.com
          </motion.a>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 80 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="w-[1px] bg-gradient-to-t from-[#64ffda] to-transparent"
          />
        </motion.div>
      </section>
    </div>
  )
}

export default Hero
