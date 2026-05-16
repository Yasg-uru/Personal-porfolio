import { useEffect, useMemo, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/state/hook"
import { fetchGitHubContributions } from "@/state/slices/projectSlice/slice"
import type { ContributionDay } from "@/state/slices/projectSlice/github.type"

export const useGitHubStats = () => {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const gitHubData = useAppSelector((state) => state.project.gitHubData)
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null)
  const [, setIsLoaded] = useState(false)
  const activityLogRef = useRef<HTMLDivElement | null>(null)

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const availableYears = useMemo(() => {
    const weeks = gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks
    if (!weeks) return [new Date().getFullYear().toString()]

    const years = new Set<string>()
    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.date) {
          years.add(new Date(day.date).getFullYear().toString())
        }
      })
    })

    return Array.from(years).sort((left, right) => Number.parseInt(right) - Number.parseInt(left))
  }, [gitHubData])

  const filteredWeeks = useMemo(() => {
    const weeks = gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks
    if (!weeks) return []

    const startDate = new Date(currentYear, currentMonth - 11, 1)
    const endDate = new Date(currentYear, currentMonth + 1, 0)

    return weeks.filter((week) =>
      week.contributionDays.some((day) => {
        const dayDate = new Date(day.date)
        return dayDate >= startDate && dayDate <= endDate
      })
    )
  }, [gitHubData, currentYear, currentMonth])

  const yearlyWeeks = useMemo(() => {
    const weeks = gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks
    if (!weeks) return []

    const startDate = new Date(`${selectedYear}-01-01`)
    const endDate = new Date(`${selectedYear}-12-31`)

    return weeks.filter((week) =>
      week.contributionDays.some((day) => {
        const dayDate = new Date(day.date)
        return dayDate >= startDate && dayDate <= endDate
      })
    )
  }, [gitHubData, selectedYear])

  const stats = useMemo(() => {
    const weeksToUse = selectedYear === currentYear.toString() ? filteredWeeks : yearlyWeeks
    const allDays = weeksToUse.flatMap((week) => week.contributionDays)
    const activeDays = allDays.filter((day) => day.contributionCount > 0)
    const totalContributions = allDays.reduce((sum, day) => sum + day.contributionCount, 0)

    let currentStreak = 0
    for (let index = allDays.length - 1; index >= 0; index--) {
      if (allDays[index].contributionCount > 0) currentStreak++
      else break
    }

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

    const avgContributions = allDays.length ? totalContributions / allDays.length : 0

    const maxDay = allDays.reduce(
      (max, day) => (day.contributionCount > max.contributionCount ? day : max),
      { contributionCount: 0, date: "", color: "" }
    )

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
    if (count === 0) return "#0f0f0f"
    if (count <= 3) return "hsl(var(--primary) / 0.25)"
    if (count <= 6) return "hsl(var(--primary) / 0.5)"
    if (count <= 9) return "hsl(var(--primary) / 0.75)"
    return "hsl(var(--primary))"
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
      .then(() => setIsLoaded(true))
      .catch((error) => {
        toast({
          title: "GitHub data fetch failed",
          description: error.toString(),
          variant: "destructive",
        })
      })
  }, [dispatch, toast])

  useEffect(() => {
    if (!selectedDay) return

    const handlePointerDown = (event: PointerEvent) => {
      if (activityLogRef.current && !activityLogRef.current.contains(event.target as Node)) {
        setSelectedDay(null)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [selectedDay])

  const weeksToDisplay = selectedYear === currentYear.toString() ? filteredWeeks : yearlyWeeks

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return {
    gitHubData,
    selectedDay,
    setSelectedDay,
    selectedYear,
    setSelectedYear,
    hoveredSquare,
    setHoveredSquare,
    activityLogRef,
    availableYears,
    filteredWeeks,
    yearlyWeeks,
    stats,
    getContributionColor,
    getIntensityLevel,
    formatDate,
    weekdays,
    weeksToDisplay,
    containerVariants,
    itemVariants,
    currentYear,
  }
}
