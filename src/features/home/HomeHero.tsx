import type React from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import HeroFlipCard from "./components/HeroFlipCard"
import HeroIntro from "./components/HeroIntro"
import HeroSocialRail from "./components/HeroSocialRail"
import { heroDescriptions } from "./data/homeContent"
import { useCyclingDescription } from "./hooks/useCyclingDescription"
import YashChoudhary from "../../assets/my_images/yash-choudhary-image .jpg"

const HomeHero: React.FC = () => {
  const description = useCyclingDescription(heroDescriptions, 4000)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />

      <section className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          <HeroIntro description={description} />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <HeroFlipCard
              imageSrc={YashChoudhary || "/placeholder.svg"}
              imageAlt="Yash Choudhary"
              backText="yash choudhary"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronDown className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      <HeroSocialRail />
    </div>
  )
}

export default HomeHero
