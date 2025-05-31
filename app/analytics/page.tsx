"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Calendar, Target } from "lucide-react"

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7days")

  // Mock data for charts
  const weeklyData = [
    { day: "Mon", pickups: 45, permissions: 38, pitches: 32, closes: 12 },
    { day: "Tue", pickups: 52, permissions: 44, pitches: 37, closes: 14 },
    { day: "Wed", pickups: 38, permissions: 32, pitches: 28, closes: 9 },
    { day: "Thu", pickups: 61, permissions: 52, pitches: 44, closes: 18 },
    { day: "Fri", pickups: 48, permissions: 41, pitches: 35, closes: 13 },
    { day: "Sat", pickups: 29, permissions: 24, pitches: 20, closes: 7 },
    { day: "Sun", pickups: 33, permissions: 28, pitches: 24, closes: 8 },
  ]

  const conversionFunnel = [
    { stage: "Calls Made", count: 420, percentage: 100 },
    { stage: "Pickups", count: 306, percentage: 73 },
    { stage: "Permissions", count: 259, percentage: 62 },
    { stage: "Pitches", count: 220, percentage: 52 },
    { stage: "Closes", count: 81, percentage: 19 },
  ]

  const pitchQualityTrend = [
    { period: "Week 1", quality: 6.8 },
    { period: "Week 2", quality: 7.2 },
    { period: "Week 3", quality: 7.6 },
    { period: "Week 4", quality: 7.8 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                Analytics
              </h1>
              <p className="text-gray-600 mt-1">Detailed performance insights and trends</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{stage.count}</span>
                      <span className="text-sm text-muted-foreground">({stage.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={stage.percentage} className="h-3" />
                  {index < conversionFunnel.length - 1 && (
                    <div className="text-center text-sm text-muted-foreground">
                      ↓ {Math.round((conversionFunnel[index + 1].count / stage.count) * 100)}% conversion
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weeklyData.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium w-12">{day.day}</span>
                    <div className="flex-1 grid grid-cols-4 gap-4 ml-4">
                      <div className="text-center">
                        <div className="text-sm text-blue-600 font-medium">{day.pickups}</div>
                        <div className="text-xs text-muted-foreground">Pickups</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-indigo-600 font-medium">{day.permissions}</div>
                        <div className="text-xs text-muted-foreground">Permissions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-purple-600 font-medium">{day.pitches}</div>
                        <div className="text-xs text-muted-foreground">Pitches</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-green-600 font-medium">{day.closes}</div>
                        <div className="text-xs text-muted-foreground">Closes</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 ml-16">
                    <Progress value={(day.pickups / 70) * 100} className="h-2" />
                    <Progress value={(day.permissions / 60) * 100} className="h-2" />
                    <Progress value={(day.pitches / 50) * 100} className="h-2" />
                    <Progress value={(day.closes / 20) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pitch Quality Trend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Pitch Quality Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pitchQualityTrend.map((week) => (
                  <div key={week.period} className="flex justify-between items-center">
                    <span className="font-medium">{week.period}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{week.quality}/10</span>
                      <Progress value={week.quality * 10} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Improving Trend
                </div>
                <p className="text-sm text-green-600 mt-1">Pitch quality has improved by 14.7% over the last month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <Target className="h-4 w-4" />
                  Best Day
                </div>
                <p className="text-sm text-blue-600 mt-1">Thursday shows consistently highest conversion rates</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 text-yellow-700 font-medium">
                  <TrendingDown className="h-4 w-4" />
                  Opportunity
                </div>
                <p className="text-sm text-yellow-600 mt-1">
                  Weekend performance could be improved with better scheduling
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
