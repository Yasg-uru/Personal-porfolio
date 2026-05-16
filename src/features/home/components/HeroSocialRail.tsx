import type React from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

const HeroSocialRail: React.FC = () => {
  return (
    <>
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
          whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 rounded-full border border-border hover:border-primary"
        >
          <FaGithub size={20} />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/yash-choudhary-28766a259"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="text-white/60 hover:text-primary transition-all duration-300 p-3 rounded-full border border-white/20 hover:border-primary"
        >
          <FaLinkedin size={20} />
        </motion.a>

        <motion.a
          href="https://x.com/yashc442"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="text-white/60 hover:text-primary transition-all duration-300 p-3 rounded-full border border-white/20 hover:border-primary"
        >
          <FaTwitter size={20} />
        </motion.a>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 2, duration: 1 }}
          className="w-[1px] bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="fixed right-8 bottom-32 flex flex-col items-center gap-6 z-50"
      >
        <motion.a
          href="mailto:yashpawar12122004@gmail.com"
          whileHover={{ scale: 1.05, color: "#64ffda" }}
          className="text-white/60 hover:text-primary transition-all duration-300 text-sm tracking-widest"
          style={{ writingMode: "vertical-rl" }}
        >
          yashpawar12122004@gmail.com
        </motion.a>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="w-[1px] bg-gradient-to-t from-primary to-transparent"
        />
      </motion.div>
    </>
  )
}

export default HeroSocialRail
