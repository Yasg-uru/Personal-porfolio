import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, GitCommit, TrendingUp, Flame, Target, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/state/hook"
import { fetchGitHubContributions } from "@/state/slices/projectSlice/slice"
import { useToast } from "@/hooks/use-toast"
import { ContributionDay } from "@/state/slices/projectSlice/github.type"

export default function GitHubStatsComponent() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const gitHubData = useAppSelector((state) => state.project.gitHubData);
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [hoveredSquare, setHoveredSquare] = useState<string | null>(null)
  // Get all available years from the GitHub data
  const availableYears = useMemo(() => {
    if (!gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      return [new Date().getFullYear().toString()];
    }
    
    const years = new Set<string>();
    gitHubData.user.contributionsCollection.contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        if (day.date) {
          years.add(new Date(day.date).getFullYear().toString());
        }
      });
    });
    
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [gitHubData]);

  // Get current month and year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  // Filter data to show only the last 12 months from current month
  const filteredWeeks = useMemo(() => {
    if (!gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      return [];
    }
    
    const allWeeks = gitHubData.user.contributionsCollection.contributionCalendar.weeks;
    
    // Calculate start date for 12 months back from current month
    const startDate = new Date(currentYear, currentMonth - 11, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0); // Last day of current month
    
    return allWeeks.filter(week => {
      return week.contributionDays.some(day => {
        const dayDate = new Date(day.date);
        return dayDate >= startDate && dayDate <= endDate;
      });
    });
  }, [gitHubData, currentYear, currentMonth]);

  // Filter data by selected year
  const yearlyWeeks = useMemo(() => {
    if (!gitHubData?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      return [];
    }
    
    const startDate = new Date(`${selectedYear}-01-01`);
    const endDate = new Date(`${selectedYear}-12-31`);
    
    return gitHubData.user.contributionsCollection.contributionCalendar.weeks.filter(week => {
      return week.contributionDays.some(day => {
        const dayDate = new Date(day.date);
        return dayDate >= startDate && dayDate <= endDate;
      });
    });
  }, [gitHubData, selectedYear]);

  const stats = useMemo(() => {
    const weeksToUse = selectedYear === currentYear.toString() ? filteredWeeks : yearlyWeeks;
    const allDays = weeksToUse.flatMap((week) => week.contributionDays);
    const activeDays = allDays.filter((day) => day.contributionCount > 0);
    const totalContributions = allDays.reduce((sum, day) => sum + day.contributionCount, 0);

    // Calculate current streak
    let currentStreak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    allDays.forEach((day) => {
      if (day.contributionCount > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    // Calculate average contributions per day
    const avgContributions = totalContributions / allDays.length;

    // Find most productive day
    const maxDay = allDays.reduce((max, day) => 
      day.contributionCount > max.contributionCount ? day : max, 
      { contributionCount: 0, date: '', color: '' }
    );

    // Calculate monthly breakdown
    const monthlyData: Record<string, { contributions: number; days: number }> = {};
    allDays.forEach((day) => {
      const month = day.date.substring(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { contributions: 0, days: 0 };
      }
      monthlyData[month].contributions += day.contributionCount;
      monthlyData[month].days++;
    });

    return {
      totalContributions,
      activeDays: activeDays.length,
      currentStreak,
      longestStreak,
      avgContributions: avgContributions.toFixed(1),
      maxDay,
      monthlyData,
    };
  }, [filteredWeeks, yearlyWeeks, selectedYear, currentYear]);

  const getIntensityLevel = (count: number) => {
    if (count === 0) return "No contributions";
    if (count <= 3) return "Low activity";
    if (count <= 6) return "Moderate activity";
    if (count <= 9) return "High activity";
    return "Very high activity";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  
 const getMonthLabels = () => {
    const months = []
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - 1)

    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate)
      date.setMonth(startDate.getMonth() + i)
      months.push({
        name: date.toLocaleString("default", { month: "short" }),
        position: i * 4.33, // Approximate weeks per month
      })
    }

    return months
  }

  const monthLabels = getMonthLabels()
  
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    dispatch(fetchGitHubContributions('Yasg-uru')).unwrap()
      .then(() => {
        toast({
          title: "Fetched GitHub data successfully",
        });
      })
      .catch((error) => {
        console.log('this is error ', error)
        toast({
          title: error.toString(),
          variant: 'destructive'
        });
      });
  }, [dispatch, toast]);

  const weeksToDisplay = selectedYear === currentYear.toString() ? filteredWeeks : yearlyWeeks;

   return (
    <TooltipProvider>
      <div className="w-full max-w-7xl mx-auto p-8 space-y-8 bg-black min-h-screen">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#64ffda]   animate-pulse">
            GitHub Activity 
          </h1>
          <p className="text-gray-400 text-lg">A comprehensive view of your coding journey and contribution patterns</p>
        </div>

        {/* Year Selector */}
        <div className="flex justify-end">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800 text-gray-100 hover:bg-gray-900 transition-colors">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-gray-950 border-gray-800 text-gray-100">
              {availableYears.map((year) => (
                <SelectItem key={year} value={year} className="hover:bg-gray-800 focus:bg-gray-800">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="text-center bg-gray-950 border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <GitCommit className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                {gitHubData?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0}
              </div>
              <div className="text-sm text-gray-400 mt-1">Total Contributions</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gray-950 border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                {stats.activeDays}
              </div>
              <div className="text-sm text-gray-400 mt-1">Active Days</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gray-950 border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Flame className="h-6 w-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                {stats.currentStreak}
              </div>
              <div className="text-sm text-gray-400 mt-1">Current Streak</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gray-950 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Target className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                {stats.longestStreak}
              </div>
              <div className="text-sm text-gray-400 mt-1">Longest Streak</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gray-950 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                {stats.avgContributions}
              </div>
              <div className="text-sm text-gray-400 mt-1">Daily Average</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gray-950 border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-red-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                {stats.maxDay.contributionCount}
              </div>
              <div className="text-sm text-gray-400 mt-1">Best Day</div>
            </CardContent>
          </Card>
        </div>

        {/* Contribution Calendar */}
        <Card className="bg-gray-950 border-gray-800 hover:border-gray-700 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-gray-100 text-xl">
              <Calendar className="h-6 w-6 text-green-400" />
              Contribution Activity ({selectedYear})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Month labels */}
              <div className="relative">
                <div className="flex text-xs text-gray-400 ml-8">
                  {monthLabels.map((month, index) => (
                    <div
                      key={`${month.name}-${index}`}
                      className="flex-1 text-left"
                      style={{ marginLeft: index === 0 ? "0" : "0" }}
                    >
                      {month.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar grid */}
              <div className="flex gap-1">
                {/* Weekday labels */}
                <div className="flex flex-col gap-1 pr-3 justify-start">
                  {weekdays.map((day, index) => (
                    <div
                      key={`weekday-${index}`}
                      className="h-3 w-6 text-xs text-gray-400 flex items-center justify-end"
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

                        return (
                          <Tooltip key={squareId}>
                            <TooltipTrigger asChild>
                              <div
                                className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-gray-500 hover:ring-opacity-50 ${
                                  isHovered ? "scale-110 shadow-lg" : ""
                                } ${day.contributionCount > 0 ? "hover:brightness-110" : ""}`}
                                style={{
                                  backgroundColor: day.color,
                                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                                }}
                                onClick={() => setSelectedDay(day)}
                                onMouseEnter={() => setHoveredSquare(squareId)}
                                onMouseLeave={() => setHoveredSquare(null)}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border-gray-700 text-gray-100 shadow-xl">
                              <div className="text-center space-y-1">
                                <div className="font-semibold text-green-400">
                                  {day.contributionCount} contribution{day.contributionCount !== 1 ? "s" : ""}
                                </div>
                                <div className="text-sm text-gray-300">{formatDate(day.date)}</div>
                                <div className="text-xs text-gray-400">{getIntensityLevel(day.contributionCount)}</div>
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
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-green-400">{stats.totalContributions}</span> contributions in{" "}
                  {selectedYear}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-gray-800 hover:scale-110 transition-transform cursor-pointer" />
                    <div
                      className="w-3 h-3 rounded-sm hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: "#0e4429" }}
                    />
                    <div
                      className="w-3 h-3 rounded-sm hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: "#006d32" }}
                    />
                    <div
                      className="w-3 h-3 rounded-sm hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: "#26a641" }}
                    />
                    <div
                      className="w-3 h-3 rounded-sm hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: "#39d353" }}
                    />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Insights */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-950 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-100 text-lg">Activity Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors">
                <span className="text-sm text-gray-300">Most productive day</span>
                <Badge
                  variant="secondary"
                  className="bg-green-900/50 text-green-300 border-green-700 hover:bg-green-900 transition-colors"
                >
                  {stats.maxDay.contributionCount} contributions on{" "}
                  {stats.maxDay.date ? new Date(stats.maxDay.date).toLocaleDateString() : "N/A"}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors">
                <span className="text-sm text-gray-300">Consistency rate</span>
                <Badge
                  variant="outline"
                  className="border-blue-700 text-blue-300 hover:bg-blue-900/20 transition-colors"
                >
                  {weeksToDisplay.length > 0
                    ? ((stats.activeDays / weeksToDisplay.flatMap((w) => w.contributionDays).length) * 100).toFixed(1) +
                      "%"
                    : "0%"}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-colors">
                <span className="text-sm text-gray-300">Current momentum</span>
                <Badge
                  variant={stats.currentStreak > 7 ? "default" : "secondary"}
                  className={
                    stats.currentStreak > 7
                      ? "bg-orange-900/50 text-orange-300 border-orange-700 hover:bg-orange-900 transition-colors"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                  }
                >
                  {stats.currentStreak > 0 ? `${stats.currentStreak} day streak` : "No current streak"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-950 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-100 text-lg">Achievement Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {stats.totalContributions > 1000 && (
                  <Badge className="justify-center py-3 bg-green-900/50 text-green-300 border-green-700 hover:bg-green-900 hover:scale-105 transition-all duration-300 cursor-pointer">
                    🏆 1K+ Contributor
                  </Badge>
                )}
                {stats.longestStreak > 30 && (
                  <Badge className="justify-center py-3 bg-orange-900/50 text-orange-300 border-orange-700 hover:bg-orange-900 hover:scale-105 transition-all duration-300 cursor-pointer">
                    🔥 30+ Day Streak
                  </Badge>
                )}
                {stats.maxDay.contributionCount > 20 && (
                  <Badge className="justify-center py-3 bg-purple-900/50 text-purple-300 border-purple-700 hover:bg-purple-900 hover:scale-105 transition-all duration-300 cursor-pointer">
                    ⚡ Power User
                  </Badge>
                )}
                {stats.activeDays > 200 && (
                  <Badge className="justify-center py-3 bg-blue-900/50 text-blue-300 border-blue-700 hover:bg-blue-900 hover:scale-105 transition-all duration-300 cursor-pointer">
                    📅 Consistent Coder
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Day Details */}
        {selectedDay && (
          <Card className="border-green-700 bg-green-950/30 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-100 text-lg">{formatDate(selectedDay.date)}</h3>
                  <p className="text-green-300">
                    <span className="font-bold text-xl">{selectedDay.contributionCount}</span> contribution
                    {selectedDay.contributionCount !== 1 ? "s" : ""} •{" "}
                    {getIntensityLevel(selectedDay.contributionCount)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-full p-2 transition-all duration-200 hover:scale-110"
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