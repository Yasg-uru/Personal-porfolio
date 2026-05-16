"use client"

import { motion } from "framer-motion"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

type Day = any

type Props = {
  weekdays: string[]
  weeksToDisplay: any[]
  hoveredSquare: string | null
  setHoveredSquare: (s: string | null) => void
  getContributionColor: (count: number) => string
  getIntensityLevel: (count: number) => string
  setSelectedDay: (d: Day | null) => void
  itemVariants?: any
}

export default function CalendarGrid({ weekdays, weeksToDisplay, hoveredSquare, setHoveredSquare, getContributionColor, getIntensityLevel, setSelectedDay, itemVariants }: Props) {
  return (
    <motion.div variants={itemVariants}>
      <div className="overflow-x-auto custom-scrollbar pb-4">
        <div className="flex gap-1.5 min-w-max justify-center">
          <div className="flex flex-col gap-1.5 pr-4 justify-start pt-1">
            {weekdays.map((day, index) => (
              <div key={index} className="h-3.5 w-4 text-[10px] text-gray-600 flex items-center justify-center font-bold">{day}</div>
            ))}
          </div>

          <div className="flex gap-1.5">
            {weeksToDisplay.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1.5">
                {week.contributionDays.map((day: Day, dayIndex: number) => {
                  const squareId = `${weekIndex}-${dayIndex}`
                  const isHovered = hoveredSquare === squareId
                  const color = getContributionColor(day.contributionCount)

                  return (
                    <Tooltip key={squareId}>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.3, zIndex: 20 }}
                          className="w-3.5 h-3.5 rounded-[2px] cursor-pointer transition-colors relative"
                          style={{
                            backgroundColor: color,
                            boxShadow: isHovered && day.contributionCount > 0 ? `0 0 10px ${color}` : "none",
                          }}
                          onClick={() => setSelectedDay(day)}
                          onMouseEnter={() => setHoveredSquare(squareId)}
                          onMouseLeave={() => setHoveredSquare(null)}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-gray-900 border-white/10 text-white p-3 shadow-2xl backdrop-blur-xl">
                        <div className="text-center space-y-1">
                          <div className="font-bold text-primary">{day.contributionCount} Contributions</div>
                          <div className="text-xs text-gray-400">{new Date(day.date).toLocaleDateString()}</div>
                          <div className="text-[10px] text-primary/60 uppercase tracking-tighter font-bold">{getIntensityLevel(day.contributionCount)}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
