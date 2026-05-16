import type React from "react"
import { useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export const useInteractiveFlipCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rotateX = useSpring(0, { stiffness: 140, damping: 18, mass: 0.6 })
  const rotateY = useSpring(0, { stiffness: 140, damping: 18, mass: 0.6 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const handleCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    rotateY.set(x * 360)
    rotateX.set((0.5 - y) * 12)
    glowX.set(Math.max(0, Math.min(100, x * 100)))
    glowY.set(Math.max(0, Math.min(100, y * 100)))
  }

  const resetCardRotation = () => {
    rotateX.set(0)
    rotateY.set(0)
    glowX.set(50)
    glowY.set(50)
  }

  return {
    cardRef,
    rotateX,
    rotateY,
    glowX,
    glowY,
    handleCardMove,
    resetCardRotation,
  }
}
