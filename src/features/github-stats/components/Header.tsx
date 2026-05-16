"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  availableYears: string[]
  selectedYear: string
  setSelectedYear: (y: string) => void
  itemVariants?: any
}

export default function Header({ availableYears, selectedYear, setSelectedYear, itemVariants }: Props) {
  return (
    <motion.div variants={itemVariants} className="text-center space-y-4">
      <div className="flex justify-center mb-4">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-primary shadow-[0_0_20px_rgba(255,0,102,0.2)]">
          <Github size={32} />
        </motion.div>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">GitHub <span className="text-primary">Contributions</span></h2>
      <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">A visual timeline of my open source journey, coding consistency, and technical growth.</p>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-semibold text-white/90">Performance Metrics</h3>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[140px] bg-white/[0.06] border-white/10 text-white hover:bg-white/[0.1] hover:border-primary/50 transition-all duration-300 backdrop-blur-2xl shadow-lg shadow-black/20">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-[#12070d]/95 border-white/10 text-white backdrop-blur-2xl shadow-2xl shadow-black/30">
            {availableYears.map((year) => (
              <SelectItem key={year} value={year} className="hover:bg-primary/15 focus:bg-primary/15 data-[state=checked]:bg-primary/20 data-[state=checked]:text-white">{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
