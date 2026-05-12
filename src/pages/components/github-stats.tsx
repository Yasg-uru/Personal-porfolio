"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, GitCommit, TrendingUp, Flame, Target, Clock, Github } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/state/hook"
import { fetchGitHubContributions } from "@/state/slices/projectSlice/slice"
import { useToast } from "@/hooks/use-toast"
import type { ContributionDay } from "@/state/slices/projectSlice/github.type"
import { motion } from "framer-motion"

export default function GitHubStatsComponent() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const gitHubData = useAppSelector((state) => state.project.gitHubData)
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null)
  const [, setIsLoaded] = useState(false)

  // Get all available years from the GitHub data
  const availableYears = useMemo(() => {
    if (!gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      return [new Date().getFullYear().toString()]
    }

    const years = new Set<string>()
    gitHubData.user.contributionsCollection.contributionCalendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.date) {
          years.add(new Date(day.date).getFullYear().toString())
        }
      })
    })

    return Array.from(years).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  }, [gitHubData])

  // Get current month and year
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() // 0-indexed

  // Filter data to show only the last 12 months from current month
  const filteredWeeks = useMemo(() => {
    if (!gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      return []
    }

    const allWeeks = gitHubData.user.contributionsCollection.contributionCalendar.weeks

    // Calculate start date for 12 months back from current month
    const startDate = new Date(currentYear, currentMonth - 11, 1)
    const endDate = new Date(currentYear, currentMonth + 1, 0) // Last day of current month

    return allWeeks.filter((week) => {
      return week.contributionDays.some((day) => {
        const dayDate = new Date(day.date)
        return dayDate >= startDate && dayDate <= endDate
      })
    })
  }, [gitHubData, currentYear, currentMonth])

  // Filter data by selected year
  const yearlyWeeks = useMemo(() => {
    if (!gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      return []
    }

    const startDate = new Date(`${selectedYear}-01-01`)
    const endDate = new Date(`${selectedYear}-12-31`)

    return gitHubData.user.contributionsCollection.contributionCalendar.weeks.filter((week) => {
      return week.contributionDays.some((day) => {
        const dayDate = new Date(day.date)
        return dayDate >= startDate && dayDate <= endDate
      })
    })
  }, [gitHubData, selectedYear])

  const stats = useMemo(() => {
    const weeksToUse = selectedYear === currentYear.toString() ? filteredWeeks : yearlyWeeks
    const allDays = weeksToUse.flatMap((week) => week.contributionDays)
    const activeDays = allDays.filter((day) => day.contributionCount > 0)
    const totalContributions = allDays.reduce((sum, day) => sum + day.contributionCount, 0)

    // Calculate current streak
    let currentStreak = 0
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) {
        currentStreak++
      } else {
        break
      }
    }

    // Calculate longest streak
    let longestStreak = 0
    let tempStreak = 0
    allDays.forEach((day) => {
      if (day.contributionCount > 0) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    })

    // Calculate average contributions per day
    const avgContributions = totalContributions / allDays.length

    // Find most productive day
    const maxDay = allDays.reduce((max, day) => (day.contributionCount > max.contributionCount ? day : max), {
      contributionCount: 0,
      date: "",
      color: "",
    })

    return {
      totalContributions,
      activeDays: activeDays.length,
      currentStreak,
      longestStreak,
      avgContributions: avgContributions.toFixed(1),
      maxDay,
    }
  }, [filteredWeeks, yearlyWeeks, selectedYear, currentYear])

  const getContributionColor = (count: number) => {
    if (count === 0) return "#0f0f0f" // Dark gray for no contributions
    if (count <= 3) return "hsl(var(--primary) / 0.25)" // Light primary
    if (count <= 6) return "hsl(var(--primary) / 0.5)" // Medium primary
    if (count <= 9) return "hsl(var(--primary) / 0.75)" // Dark primary
    return "hsl(var(--primary))" // Full primary
  }

  const getIntensityLevel = (count: number) => {
    if (count === 0) return "No contributions"
    if (count <= 3) return "Low activity"
    if (count <= 6) return "Moderate activity"
    if (count <= 9) return "High activity"
    return "Very high activity"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"]

  useEffect(() => {
    dispatch(fetchGitHubContributions("Yasg-uru"))
      .unwrap()
      .then(() => {
        setIsLoaded(true)
      })
      .catch((error) => {
        console.log("this is error ", error)
        toast({
          title: "GitHub data fetch failed",
          description: error.toString(),
          variant: "destructive",
        })
      })
  }, [dispatch, toast])

  const weeksToDisplay = selectedYear === currentYear.toString() ? filteredWeeks : yearlyWeeks

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

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
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-primary shadow-[0_0_20px_rgba(255,0,102,0.2)]"
              >
                <Github size={32} />
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              GitHub <span className="text-primary">Contributions</span>
            </h2>
            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
              A visual timeline of my open source journey, coding consistency, and technical growth.
            </p>
          </motion.div>

          {/* Controls and Key Stats Container */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="flex justify-between items-center">
               <h3 className="text-xl font-semibold text-white/90">Performance Metrics</h3>
               <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 backdrop-blur-md">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10 text-white backdrop-blur-xl">
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year} className="hover:bg-primary/20 focus:bg-primary/20">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: GitCommit, value: gitHubData?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0, label: "Total Push", color: "primary" },
                { icon: Calendar, value: stats.activeDays, label: "Active Days", color: "primary" },
                { icon: Flame, value: stats.currentStreak, label: "Current Streak", color: "primary" },
                { icon: Target, value: stats.longestStreak, label: "Best Streak", color: "primary" },
                { icon: TrendingUp, value: stats.avgContributions, label: "Daily Avg", color: "primary" },
                { icon: Clock, value: stats.maxDay.contributionCount, label: "Best Day", color: "primary" },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }}>
                  <Card className="h-full bg-white/[0.03] border-white/10 hover:border-primary/40 transition-all duration-500 backdrop-blur-md overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col items-center text-center space-y-2 relative z-10">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary mb-1">
                        <stat.icon size={20} />
                      </div>
                      <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium tracking-wider uppercase">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contribution Grid Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/[0.03] border-white/10 hover:border-primary/20 transition-all duration-700 backdrop-blur-md overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <Calendar className="h-5 w-5 text-primary" />
                  Contribution Calendar <span className="text-white/40 text-sm font-normal ml-2">({selectedYear})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="overflow-x-auto custom-scrollbar pb-4">
                  <div className="flex gap-1.5 min-w-max justify-center">
                    {/* Weekday Labels */}
                    <div className="flex flex-col gap-1.5 pr-4 justify-start pt-1">
                      {weekdays.map((day, index) => (
                        <div key={index} className="h-3.5 w-4 text-[10px] text-gray-600 flex items-center justify-center font-bold">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Contribution Squares */}
                    <div className="flex gap-1.5">
                      {weeksToDisplay.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1.5">
                          {week.contributionDays.map((day, dayIndex) => {
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
                                      boxShadow: isHovered && day.contributionCount > 0 ? `0 0 10px ${color}` : "none"
                                    }}
                                    onClick={() => setSelectedDay(day)}
                                    onMouseEnter={() => setHoveredSquare(squareId)}
                                    onMouseLeave={() => setHoveredSquare(null)}
                                  />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 border-white/10 text-white p-3 shadow-2xl backdrop-blur-xl">
                                  <div className="text-center space-y-1">
                                    <div className="font-bold text-primary">
                                      {day.contributionCount} Contributions
                                    </div>
                                    <div className="text-xs text-gray-400">{formatDate(day.date)}</div>
                                    <div className="text-[10px] text-primary/60 uppercase tracking-tighter font-bold">
                                      {getIntensityLevel(day.contributionCount)}
                                    </div>
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

                {/* Legend and Total */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-white/5 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-bold text-white">{stats.totalContributions}</span> 
                    <span>contributions in {selectedYear}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>Less</span>
                    <div className="flex gap-1.5">
                      {[0, 1, 3, 6, 9].map((count, i) => (
                        <div key={i} className="w-3.5 h-3.5 rounded-[2px]" style={{ backgroundColor: getContributionColor(count) }} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Insights & Achievements */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-white/[0.03] border-white/10 hover:border-primary/30 transition-all duration-500 backdrop-blur-md group">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Deep Insights
                  </CardTitle>
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
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { condition: stats.totalContributions > 1000, badge: "Elite Contributor", sub: "1K+ Push", icon: "🏆" },
                      { condition: stats.longestStreak > 30, badge: "Code Warrior", sub: "30+ Day Streak", icon: "🔥" },
                      { condition: stats.maxDay.contributionCount > 20, badge: "Power Coder", sub: "Peak Velocity", icon: "⚡" },
                      { condition: stats.activeDays > 200, badge: "Daily Pilot", sub: "200+ Days", icon: "📅" },
                    ].map((ach, i) => ach.condition && (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05 }}
                        className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3"
                      >
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

          {/* Selected Day Details Overlay/Card */}
          {selectedDay && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed bottom-12 right-6 md:right-12 z-50 w-full max-w-sm"
            >
              <Card className="border-primary/50 bg-gray-900/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(255,0,102,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Activity Log</div>
                      <h4 className="text-xl font-bold text-white">{formatDate(selectedDay.date)}</h4>
                    </div>
                    <button onClick={() => setSelectedDay(null)} className="text-gray-500 hover:text-white transition-colors">
                      <Clock size={20} className="rotate-45" />
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
          )}
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
