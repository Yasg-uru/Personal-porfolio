import type React from "react"
import { motion } from "framer-motion"
import { FaDownload, FaRocket } from "react-icons/fa"
import { Typewriter } from "react-simple-typewriter"
import { Calendar, MapPin, Mail } from "lucide-react"
import YashChoudharyResume from "../../../assets/YashChoudharyResume.pdf"
import { heroStats } from "../data/homeContent"

type HeroIntroProps = {
  description: string
}

const HeroIntro: React.FC<HeroIntroProps> = ({ description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8 max-w-2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <span className="text-2xl">👋</span>
        <p className="text-primary text-lg font-medium tracking-wide">Hello World! My name is</p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-5xl lg:text-7xl font-bold text-white"
      >
        Yash Choudhary
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-3xl lg:text-5xl font-bold text-white/80"
      >
        I love to <span className="text-primary">explore & code</span>!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-white/70 text-lg leading-relaxed min-h-[100px]"
      >
        <Typewriter
          key={description}
          words={[description]}
          loop={false}
          typeSpeed={50}
          deleteSpeed={30}
          cursor
          cursorStyle="|"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="grid grid-cols-3 gap-6 py-6"
      >
        {heroStats.map((stat) => (
          <div key={stat.label} className="text-center group">
            <div className="text-3xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.div>

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
            className="px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 shadow-[0_8px_32px_rgba(255,0,102,0.3)]"
          >
            <FaRocket />
            View My Work
          </motion.button>
        </a>

        <a href={YashChoudharyResume} download="YashChoudharyResume.pdf">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-primary/40 text-white font-semibold rounded-lg hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-2"
          >
            <FaDownload />
            Download CV
          </motion.button>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="flex flex-wrap gap-6 text-white/60 text-sm"
      >
        <div className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
          <Mail className="h-4 w-4" />
          yashpawar12122004@gmail.com
        </div>
        <div className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
          <MapPin className="h-4 w-4" />
          India
        </div>
        <div className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
          <Calendar className="h-4 w-4" />
          Available for work
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HeroIntro
