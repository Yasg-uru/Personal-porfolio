"use client"

import { motion } from "framer-motion"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { useGitHubStats } from "@/features/github-stats/hooks/useGitHubStats"
import Header from "@/features/github-stats/components/Header"
import StatCards from "@/features/github-stats/components/StatCards"
import CalendarGrid from "@/features/github-stats/components/CalendarGrid"
import Insights from "@/features/github-stats/components/Insights"

export default function GitHubStatsComponent() {
  const {
    gitHubData,
    selectedDay,
    setSelectedDay,
    selectedYear,
    setSelectedYear,
    hoveredSquare,
    setHoveredSquare,
    activityLogRef,
    availableYears,
    stats,
    getContributionColor,
    getIntensityLevel,
    formatDate,
    weekdays,
    weeksToDisplay,
    containerVariants,
    itemVariants,
  } = useGitHubStats()

  return (
    <TooltipProvider>
      <div className="w-full bg-black relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-7xl mx-auto p-6 md:p-12 space-y-12 relative z-10"
        >
          <Header availableYears={availableYears} selectedYear={selectedYear} setSelectedYear={setSelectedYear} itemVariants={itemVariants} />
          <div className="space-y-6">
            <StatCards stats={stats} gitHubData={gitHubData} itemVariants={itemVariants} />
          </div>

          {/* Contribution Grid Section */}
          <CalendarGrid
            weekdays={weekdays}
            weeksToDisplay={weeksToDisplay}
            hoveredSquare={hoveredSquare}
            setHoveredSquare={setHoveredSquare}
            getContributionColor={getContributionColor}
            getIntensityLevel={getIntensityLevel}
            setSelectedDay={setSelectedDay}
            itemVariants={itemVariants}
          />

          {/* Activity Insights & Achievements */}
          <Insights stats={stats} weeksToDisplay={weeksToDisplay} itemVariants={itemVariants} />

          {/* Selected Day Details Overlay/Card */}
          {selectedDay && (
            <div className="fixed inset-0 z-[9999]">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
              <motion.div 
                ref={activityLogRef}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="fixed bottom-12 right-6 md:right-12 z-[10000] w-full max-w-sm"
              >
                <Card className="border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Activity Log</div>
                        <h4 className="text-xl font-bold text-white">{formatDate(selectedDay.date)}</h4>
                      </div>
                      <button
                        onClick={() => setSelectedDay(null)}
                        aria-label="Close activity log"
                        className="text-gray-400 hover:text-white transition-colors rounded-full p-1 hover:bg-white/5"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-5xl font-black text-primary leading-none">{selectedDay.contributionCount}</span>
                      <div className="mb-1">
                        <div className="text-sm font-bold text-white">Push Operations</div>
                        <div className="text-xs text-gray-400">{getIntensityLevel(selectedDay.contributionCount)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
