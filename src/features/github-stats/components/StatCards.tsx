"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

type Stat = { icon: any; value: number | string; label: string }

type Props = {
  stats: any
  gitHubData: any
  itemVariants?: any
}

export default function StatCards({ stats, gitHubData, itemVariants }: Props) {
  const items: Stat[] = [
    { icon: null, value: gitHubData?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0, label: "Total Push" },
    { icon: null, value: stats.activeDays, label: "Active Days" },
    { icon: null, value: stats.currentStreak, label: "Current Streak" },
    { icon: null, value: stats.longestStreak, label: "Best Streak" },
    { icon: null, value: stats.avgContributions, label: "Daily Avg" },
    { icon: null, value: stats.maxDay.contributionCount, label: "Best Day" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((stat, index) => (
        <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }}>
          <Card className="h-full bg-white/[0.03] border-white/10 hover:border-primary/40 transition-all duration-500 backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-5 flex flex-col items-center text-center space-y-2 relative z-10">
              <div className="p-2 rounded-lg bg-primary/10 text-primary mb-1">
                {/* placeholder icon */}
                <span />
              </div>
              <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{stat.value}</div>
              <div className="text-xs text-gray-500 font-medium tracking-wider uppercase">{stat.label}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
