"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp, Flame, Target, GitCommit } from "lucide-react"

type Props = {
  stats: any
  weeksToDisplay: any[]
  itemVariants?: any
}

export default function Insights({ stats, weeksToDisplay, itemVariants }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <motion.div variants={itemVariants}>
        <Card className="h-full bg-white/[0.03] border-white/10 hover:border-primary/30 transition-all duration-500 backdrop-blur-md group">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Deep Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Productivity Peak", value: `${stats.maxDay.contributionCount} units on ${stats.maxDay.date ? new Date(stats.maxDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}`, icon: Target },
              { label: "Commit Consistency", value: `${weeksToDisplay.length > 0 ? ((stats.activeDays / (weeksToDisplay.length * 7)) * 100).toFixed(1) + "%" : "0%"}`, icon: GitCommit },
              { label: "Active Momentum", value: stats.currentStreak > 0 ? `${stats.currentStreak} day streak` : "Building pace...", icon: Flame },
            ].map((insight, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="text-primary/60"><insight.icon size={18} /></div>
                  <span className="text-sm text-gray-400">{insight.label}</span>
                </div>
                <span className="text-sm font-bold text-white">{insight.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="h-full bg-white/[0.03] border-white/10 hover:border-primary/30 transition-all duration-500 backdrop-blur-md group">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { condition: stats.totalContributions > 1000, badge: "Elite Contributor", sub: "1K+ Push", icon: "🏆" },
                { condition: stats.longestStreak > 30, badge: "Code Warrior", sub: "30+ Day Streak", icon: "🔥" },
                { condition: stats.maxDay.contributionCount > 20, badge: "Power Coder", sub: "Peak Velocity", icon: "⚡" },
                { condition: stats.activeDays > 200, badge: "Daily Pilot", sub: "200+ Days", icon: "📅" },
              ].map((ach, i) => ach.condition && (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                  <span className="text-2xl">{ach.icon}</span>
                  <div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-tighter">{ach.badge}</div>
                    <div className="text-xs text-white font-medium">{ach.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
