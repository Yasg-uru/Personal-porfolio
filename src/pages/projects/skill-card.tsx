"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type React from "react" // Import React

interface SkillCardProps {
  name: string
  icon: React.ReactNode
  description: string
  experience: number
  projectCount: number
  proficiency: number
}

export default function SkillCard({ name, icon, description, experience, projectCount, proficiency }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="relative overflow-hidden border border-blue-500/10 bg-blue-950/10 backdrop-blur-sm">
        <motion.div
          className="absolute inset-0 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)",
          }}
        />
        <div className="p-6 space-y-4" onMouseMove={handleMouseMove}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white">{name}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Proficiency</span>
                <span className="text-blue-400">{proficiency}%</span>
              </div>
              <Progress value={proficiency} className="h-1" />
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Experience:</span>
                <span className="text-white">{experience} years</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Projects:</span>
                <span className="text-white">{projectCount}</span>
              </div>
            </div>
          </div>
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

