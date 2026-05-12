"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
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
      whileHover={{ y: -8 }}
    >
      <Card className="group relative h-48 w-full overflow-hidden bg-white/[0.03] border-white/10 hover:border-primary/40 transition-all duration-500 backdrop-blur-md">
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Background glow on hover */}
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <CardContent className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
          {/* Icon Container */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-3xl transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          >
            {icon}
          </motion.div>
          
          {/* Skill Name */}
          <h3 className="mt-4 text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
            {name}
          </h3>
          
          {/* Subtle line */}
          <div className="mt-2 w-8 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-primary/50 transition-all duration-500" />
        </CardContent>
      </Card>
    </motion.div>
  )
}
