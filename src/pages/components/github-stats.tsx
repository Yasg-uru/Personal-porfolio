"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, GitCommit, TrendingUp, Flame, Target, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/state/hook"
import { fetchGitHubContributions } from "@/state/slices/projectSlice/slice"
import { useToast } from "@/hooks/use-toast"
import type { ContributionDay } from "@/state/slices/projectSlice/github.type"

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
    if (count === 0) return "#0a0a0a" // Black for no contributions
    if (count <= 3) return "#ff6b35" // Light orange
    if (count <= 6) return "#ff5722" // Medium orange
    if (count <= 9) return "#e64a19" // Dark orange
    return "#d84315" // Very dark orange
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
        toast({
          title: "Fetched GitHub data successfully",
        })
      })
      .catch((error) => {
        console.log("this is error ", error)
        toast({
          title: error.toString(),
          variant: "destructive",
        })
      })
  }, [dispatch, toast])

  const weeksToDisplay = selectedYear === currentYear.toString() ? filteredWeeks : yearlyWeeks

  return (
    <TooltipProvider>
      <div className="w-full max-w-7xl mx-auto p-6 space-y-8 dark:bg-black min-h-screen">
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in-0 duration-1000">
          <div className="relative">
            <h1 className="text-2xl font-bold bg-[#64ffda] bg-clip-text text-transparent animate-pulse">
              GitHub Activity
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-orange-500/20 to-orange-600/20 blur-xl -z-10 animate-pulse"></div>
          </div>
          <p className="text-gray-400 text-lg font-light">Visualizing your coding journey through time</p>
        </div>

        {/* Year Selector */}
        <div className="flex justify-end animate-in slide-in-from-right-4 duration-700">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px] bg-black/50 border-orange-500/30 text-gray-100 hover:bg-black/70 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-orange-500/30 text-gray-100 backdrop-blur-md">
              {availableYears.map((year) => (
                <SelectItem
                  key={year}
                  value={year}
                  className="hover:bg-orange-500/20 focus:bg-orange-500/20 transition-colors"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in fade-in-0 duration-1000 delay-300">
          {[
            {
              icon: GitCommit,
              value: gitHubData?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0,
              label: "Total",
              color: "orange",
            },
            { icon: Calendar, value: stats.activeDays, label: "Active Days", color: "blue" },
            { icon: Flame, value: stats.currentStreak, label: "Current Streak", color: "red" },
            { icon: Target, value: stats.longestStreak, label: "Best Streak", color: "purple" },
            { icon: TrendingUp, value: stats.avgContributions, label: "Daily Avg", color: "emerald" },
            { icon: Clock, value: stats.maxDay.contributionCount, label: "Best Day", color: "pink" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-black/40 border-gray-800/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-4 text-center relative z-10">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-5 w-5 text-orange-400 group-hover:scale-110 group-hover:text-orange-300 transition-all duration-300" />
                </div>
                <div className="text-2xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contribution Calendar */}
        <Card className="group relative overflow-hidden bg-black/40 border-gray-800/50 hover:border-orange-500/30 transition-all  backdrop-blur-sm animate-in fade-in-0 duration-1000 delay-500">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-gray-100 text-xl font-light">
              <Calendar className="h-5 w-5 text-orange-400" />
              Contribution Grid ({selectedYear})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 relative z-10">
            <div className="space-y-4">
              {/* Calendar grid */}
              <div className="flex gap-1 justify-center">
                {/* Weekday labels */}
                <div className="flex flex-col gap-1 pr-2 justify-start">
                  {weekdays.map((day, index) => (
                    <div
                      key={`weekday-${index}`}
                      className="h-3 w-4 text-xs text-gray-500 flex items-center justify-center font-medium"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Contribution squares */}
                <div className="flex gap-1 overflow-x-auto pb-2">
                  {weeksToDisplay.map((week, weekIndex) => (
                    <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
                      {week.contributionDays.map((day, dayIndex) => {
                        const squareId = `${weekIndex}-${dayIndex}`
                        const isHovered = hoveredSquare === squareId
                        const contributionColor = getContributionColor(day.contributionCount)

                        return (
                          <Tooltip key={squareId}>
                            <TooltipTrigger asChild>
                              <div
                                className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-300 hover:scale-125 hover:z-10 relative animate-in fade-in-0`}
                                style={{
                                  backgroundColor: contributionColor,
                                  animationDelay: `${(weekIndex * 7 + dayIndex) * 10}ms`,
                                  boxShadow:
                                    isHovered && day.contributionCount > 0
                                      ? `0 0 12px ${contributionColor}`
                                      : day.contributionCount > 0
                                        ? `0 0 4px ${contributionColor}40`
                                        : "none",
                                  transform: isHovered ? "scale(1.25)" : "scale(1)",
                                }}
                                onClick={() => setSelectedDay(day)}
                                onMouseEnter={() => setHoveredSquare(squareId)}
                                onMouseLeave={() => setHoveredSquare(null)}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-black/90 border-orange-500/30 text-gray-100 shadow-xl backdrop-blur-md">
                              <div className="text-center space-y-1">
                                <div className="font-semibold text-orange-400">
                                  {day.contributionCount} contribution{day.contributionCount !== 1 ? "s" : ""}
                                </div>
                                <div className="text-sm text-gray-300">{formatDate(day.date)}</div>
                                <div className="text-xs text-gray-500">{getIntensityLevel(day.contributionCount)}</div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-orange-400">{stats.totalContributions}</span> contributions in{" "}
                  {selectedYear}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 3, 6, 9].map((count, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-sm hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: getContributionColor(count) }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Insights */}
        <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
          <Card className="group relative overflow-hidden bg-black/40 border-gray-800/50 hover:border-orange-500/30 transition-all duration-500 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-gray-100 text-lg font-light">Activity Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {[
                {
                  label: "Most productive day",
                  value: `${stats.maxDay.contributionCount} contributions on ${stats.maxDay.date ? new Date(stats.maxDay.date).toLocaleDateString() : "N/A"}`,
                  color: "orange",
                },
                {
                  label: "Consistency rate",
                  value: `${weeksToDisplay.length > 0 ? ((stats.activeDays / weeksToDisplay.flatMap((w) => w.contributionDays).length) * 100).toFixed(1) + "%" : "0%"}`,
                  color: "blue",
                },
                {
                  label: "Current momentum",
                  value: stats.currentStreak > 0 ? `${stats.currentStreak} day streak` : "No current streak",
                  color: "red",
                },
              ].map((insight, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm text-gray-300 font-medium">{insight.label}</span>
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30 transition-colors">
                    {insight.value}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-black/40 border-gray-800/50 hover:border-orange-500/30 transition-all duration-500 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-gray-100 text-lg font-light">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 gap-3">
                {[
                  { condition: stats.totalContributions > 1000, badge: "🏆 1K+ Contributor", color: "orange" },
                  { condition: stats.longestStreak > 30, badge: "🔥 30+ Day Streak", color: "red" },
                  { condition: stats.maxDay.contributionCount > 20, badge: "⚡ Power User", color: "purple" },
                  { condition: stats.activeDays > 200, badge: "📅 Consistent Coder", color: "blue" },
                ].map(
                  (achievement, index) =>
                    achievement.condition && (
                      <Badge
                        key={index}
                        className="justify-center py-2 bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30 hover:scale-105 transition-all duration-300 cursor-pointer animate-in slide-in-from-right-4"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {achievement.badge}
                      </Badge>
                    ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Day Details */}
        {selectedDay && (
          <Card className="relative overflow-hidden border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-black/40 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-orange-100 text-lg">{formatDate(selectedDay.date)}</h3>
                  <p className="text-orange-300">
                    <span className="font-bold text-2xl">{selectedDay.contributionCount}</span> contribution
                    {selectedDay.contributionCount !== 1 ? "s" : ""} •{" "}
                    {getIntensityLevel(selectedDay.contributionCount)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-gray-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-full p-2 transition-all duration-200 hover:scale-110"
                >
                  ✕
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  )
}
