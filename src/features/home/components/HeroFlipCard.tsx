import type React from "react"
import { motion } from "framer-motion"
import { Card } from "../../../components/ui/card"
import { useInteractiveFlipCard } from "../hooks/useInteractiveFlipCard"

type HeroFlipCardProps = {
  imageSrc: string
  imageAlt: string
  backText: string
}

const HeroFlipCard: React.FC<HeroFlipCardProps> = ({ imageSrc, imageAlt, backText }) => {
  const { cardRef, rotateX, rotateY, glowX, glowY, handleCardMove, resetCardRotation } =
    useInteractiveFlipCard()

  return (
    <div className="relative z-10 w-full max-w-[28rem] perspective-[1400px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleCardMove}
        onMouseLeave={resetCardRotation}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="relative h-[27rem] cursor-grab overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl active:cursor-grabbing"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1400px",
          rotateX,
          rotateY,
          willChange: "transform",
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[2rem]"
          style={{
            background: `radial-gradient(650px circle at ${glowX}% ${glowY}%, rgba(255, 0, 102, 0.24), transparent 42%)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/10" />

        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          <Card
            className="absolute inset-0 overflow-hidden border-white/10 bg-black/55 p-0 shadow-inner shadow-black/40"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(1px)",
              willChange: "transform",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.4rem]">
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </Card>

          <Card
            className="absolute inset-0 flex items-center justify-center border-white/10 bg-gradient-to-br from-[#1f0711] via-[#3a0d1f] to-[#12070d] p-6 text-center shadow-inner shadow-black/40"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
            <div className="relative">
              <h3 className="text-4xl font-bold text-white">{backText}</h3>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroFlipCard
