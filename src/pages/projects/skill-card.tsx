"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type React from "react"

interface SkillCardProps {
  name: string
  icon: React.ReactNode
}

export default function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.035 }}
    >
      <Card className="relative group w-full h-48 flex flex-col items-center justify-center space-y-4 rounded-2xl border border-blue-500/10 bg-blue-900/10 backdrop-blur-md shadow-md transition-all duration-300 hover:border-blue-400/30">
        {/* Background lighting on hover */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.12), transparent 40%)",
          }}
        />
        
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          onMouseMove={handleMouseMove}
        >
          {/* Icon circle */}
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 shadow-inner text-3xl text-blue-400">
            {icon}
          </div>
          {/* Skill name */}
          <h3 className="mt-2 text-white font-semibold text-lg text-center">{name}</h3>
        </div>
      </Card>
    </motion.div>
  )
}

function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
  e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
}
