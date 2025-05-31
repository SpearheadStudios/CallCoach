"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Phone,
  Users,
  MessageSquare,
  Handshake,
  Star,
  Plus,
  Ruler,
  Calendar,
} from "lucide-react"

// Animated Counter Component
function AnimatedCounter({
  value,
  duration = 1000,
  suffix = "",
}: { value: number; duration?: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    const startValue = displayValue

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (value - startValue) * easeOutQuart

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration, displayValue])

  return (
    <span className="tabular-nums">
      {Math.round(displayValue)}
      {suffix}
    </span>
  )
}

// Animated Progress Bar Component
function AnimatedProgress({ value, className = "" }: { value: number; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  return <Progress value={displayValue} className={`transition-all duration-1000 ease-out ${className}`} />
}

// Bottleneck Analysis Component
function BottleneckAnalysis({ metrics }: { metrics: any }) {
  const bottlenecks = [
    { name: "Trust Rate", value: metrics.trustRate, threshold: 80, priority: 1, message: "Work on your Intro" },
    { name: "Pitch Rate", value: metrics.pitchRate, threshold: 75, priority: 2, message: "Work on your main pitch" },
    {
      name: "Close Rate",
      value: metrics.closeRate,
      threshold: 25,
      priority: 3,
      message: "Work on your ask for the meeting",
    },
  ]

  const criticalBottlenecks = bottlenecks
    .filter((metric) => metric.value < metric.threshold)
    .sort((a, b) => a.priority - b.priority)

  const primaryBottleneck = criticalBottlenecks[0]

  if (!primaryBottleneck) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-green-500" />
            Performance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">All Clear!</div>
            <p className="text-sm text-muted-foreground">All metrics are performing above target thresholds.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full border-red-200 bg-red-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          Priority Bottleneck
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="text-lg font-bold text-red-600">{primaryBottleneck.name}</div>
            <div className="text-sm text-muted-foreground">
              Current: {primaryBottleneck.value}% | Target: {primaryBottleneck.threshold}%
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-red-700">Action Required:</div>
            <div className="text-xs text-muted-foreground font-medium">{primaryBottleneck.message}</div>
          </div>
          {criticalBottlenecks.length > 1 && (
            <div className="text-xs text-muted-foreground pt-2 border-t">
              +{criticalBottlenecks.length - 1} other metric{criticalBottlenecks.length > 2 ? "s" : ""} need attention
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const [timeFrame, setTimeFrame] = useState("today")
  const [newEntry, setNewEntry] = useState({
    pitchDistance: "",
    outcome: "",
    pitchQuality: "",
  })
  const [metrics, setMetrics] = useState({
    totalPickups: 156,
    totalPermissions: 134,
    totalPitches: 112,
    totalCloses: 42,
    trustRate: 85.9,
    pitchRate: 83.6,
    closeRate: 37.5,
    pitchQuality: 7.8,
  })

  // Mock data for different time frames
  const timeFrameData = {
    today: {
      totalPickups: 156,
      totalPermissions: 134,
      totalPitches: 112,
      totalCloses: 42,
      trustRate: 85.9,
      pitchRate: 83.6,
      closeRate: 37.5,
      pitchQuality: 7.8,
    },
    week: {
      totalPickups: 892,
      totalPermissions: 756,
      totalPitches: 634,
      totalCloses: 234,
      trustRate: 84.7,
      pitchRate: 83.9,
      closeRate: 36.9,
      pitchQuality: 8.1,
    },
    month: {
      totalPickups: 3456,
      totalPermissions: 2987,
      totalPitches: 2456,
      totalCloses: 892,
      trustRate: 86.4,
      pitchRate: 82.2,
      closeRate: 36.3,
      pitchQuality: 7.9,
    },
  }

  useEffect(() => {
    setMetrics(timeFrameData[timeFrame as keyof typeof timeFrameData])
  }, [timeFrame])

  const handleAddEntry = () => {
    if (!newEntry.pitchDistance || !newEntry.outcome) return
    if ((newEntry.pitchDistance === "pitch" || newEntry.pitchDistance === "booked-meeting") && !newEntry.pitchQuality)
      return

    const quality = newEntry.pitchQuality ? Number.parseFloat(newEntry.pitchQuality) : 0

    // Simulate adding a new entry and updating metrics
    setMetrics((prev) => {
      let newPickups = prev.totalPickups
      let newPermissions = prev.totalPermissions
      let newPitches = prev.totalPitches
      let newCloses = prev.totalCloses

      // Update counts based on pitch distance
      if (newEntry.pitchDistance === "pickup") {
        newPickups += 1
      } else if (newEntry.pitchDistance === "permission") {
        newPickups += 1
        newPermissions += 1
      } else if (newEntry.pitchDistance === "pitch") {
        newPickups += 1
        newPermissions += 1
        newPitches += 1
      } else if (newEntry.pitchDistance === "booked-meeting") {
        newPickups += 1
        newPermissions += 1
        newPitches += 1
        newCloses += 1
      }

      // Calculate new rates based on the corrected math
      const newTrustRate = newPickups > 0 ? (newPermissions / newPickups) * 100 : 0
      const newPitchRate = newPermissions > 0 ? (newPitches / newPermissions) * 100 : 0
      const newCloseRate = newPitches > 0 ? (newCloses / newPitches) * 100 : 0

      return {
        ...prev,
        totalPickups: newPickups,
        totalPermissions: newPermissions,
        totalPitches: newPitches,
        totalCloses: newCloses,
        trustRate: newTrustRate,
        pitchRate: newPitchRate,
        closeRate: newCloseRate,
        pitchQuality: quality > 0 ? (prev.pitchQuality * prev.totalPitches + quality) / newPitches : prev.pitchQuality,
      }
    })

    // Reset form
    setNewEntry({ pitchDistance: "", outcome: "", pitchQuality: "" })
  }

  const getProgressColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return "bg-green-500"
    if (value >= thresholds.warning) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Sidebar Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sales Performance Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your daily sales metrics and performance</p>
            </div>
          </div>

          {/* Time Frame Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Totals Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                Total Pickups
                <span className="text-xs text-muted-foreground ml-auto">
                  {timeFrame === "today" ? "Today" : timeFrame === "week" ? "This Week" : "This Month"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                <AnimatedCounter value={metrics.totalPickups} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-500" />
                Total Permissions
                <span className="text-xs text-muted-foreground ml-auto">
                  {timeFrame === "today" ? "Today" : timeFrame === "week" ? "This Week" : "This Month"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">
                <AnimatedCounter value={metrics.totalPermissions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-500" />
                Total Pitches
                <span className="text-xs text-muted-foreground ml-auto">
                  {timeFrame === "today" ? "Today" : timeFrame === "week" ? "This Week" : "This Month"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                <AnimatedCounter value={metrics.totalPitches} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Handshake className="h-4 w-4 text-green-500" />
                Total Closes
                <span className="text-xs text-muted-foreground ml-auto">
                  {timeFrame === "today" ? "Today" : timeFrame === "week" ? "This Week" : "This Month"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                <AnimatedCounter value={metrics.totalCloses} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Entry Form */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Call Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  Pitch Distance
                </label>
                <Select
                  value={newEntry.pitchDistance}
                  onValueChange={(value) => setNewEntry((prev) => ({ ...prev, pitchDistance: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="permission">Permission</SelectItem>
                    <SelectItem value="pitch">Pitch</SelectItem>
                    <SelectItem value="booked-meeting">Booked Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Call Outcome</label>
                <Select
                  value={newEntry.outcome}
                  onValueChange={(value) => setNewEntry((prev) => ({ ...prev, outcome: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booked-meeting">Booked Meeting</SelectItem>
                    <SelectItem value="not-me">Not Me</SelectItem>
                    <SelectItem value="not-now">Not Now</SelectItem>
                    <SelectItem value="no-use-case">No Use Case</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Pitch Quality
                </label>
                <Select
                  value={newEntry.pitchQuality}
                  onValueChange={(value) => setNewEntry((prev) => ({ ...prev, pitchQuality: value }))}
                  disabled={newEntry.pitchDistance === "pickup" || newEntry.pitchDistance === "permission"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rate quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Exceptional (10)</SelectItem>
                    <SelectItem value="7.5">Good (7.5)</SelectItem>
                    <SelectItem value="5">Okay (5)</SelectItem>
                    <SelectItem value="2.5">Sub-par (2.5)</SelectItem>
                    <SelectItem value="0">Bad (0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAddEntry}
                disabled={
                  !newEntry.pitchDistance ||
                  !newEntry.outcome ||
                  (!newEntry.pitchQuality &&
                    (newEntry.pitchDistance === "pitch" || newEntry.pitchDistance === "booked-meeting"))
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Trust Rate
                {metrics.trustRate >= 80 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold">
                <AnimatedCounter value={metrics.trustRate} suffix="%" />
              </div>
              <AnimatedProgress
                value={metrics.trustRate}
                className={`h-2 transition-colors duration-1000 [&>div]:${getProgressColor(metrics.trustRate, { good: 80, warning: 60 })}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Pitch Rate
                {metrics.pitchRate >= 75 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold">
                <AnimatedCounter value={metrics.pitchRate} suffix="%" />
              </div>
              <AnimatedProgress
                value={metrics.pitchRate}
                className={`h-2 transition-colors duration-1000 [&>div]:${getProgressColor(metrics.pitchRate, { good: 75, warning: 50 })}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Handshake className="h-4 w-4" />
                Close Rate
                {metrics.closeRate >= 25 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold">
                <AnimatedCounter value={metrics.closeRate} suffix="%" />
              </div>
              <AnimatedProgress
                value={metrics.closeRate}
                className={`h-2 transition-colors duration-1000 [&>div]:${getProgressColor(metrics.closeRate, { good: 25, warning: 15 })}`}
              />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Pitch Quality and Bottleneck Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Pitch Quality Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-purple-600">
                <AnimatedCounter value={metrics.pitchQuality} suffix="/10" />
              </div>
              <AnimatedProgress
                value={metrics.pitchQuality * 10}
                className={`h-3 transition-colors duration-1000 [&>div]:${getProgressColor(metrics.pitchQuality, { good: 8, warning: 6 })}`}
              />
              <p className="text-sm text-gray-600">
                {metrics.pitchQuality > 8
                  ? "Excellent pitch quality!"
                  : metrics.pitchQuality >= 6
                    ? "Good pitch quality, room for improvement"
                    : "Focus on improving pitch delivery"}
              </p>
            </CardContent>
          </Card>

          <BottleneckAnalysis metrics={metrics} />
        </div>
      </div>
    </div>
  )
}
