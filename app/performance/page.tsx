"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Award, Target, Flame, Calendar, Star, Trophy, Zap, Clock } from "lucide-react"

export default function Performance() {
  const achievements = [
    {
      id: 1,
      title: "Streak Master",
      description: "5 consecutive days with 10+ calls",
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      earned: true,
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "Quality Champion",
      description: "Average pitch quality above 8.0",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      earned: true,
      date: "2024-01-08",
    },
    {
      id: 3,
      title: "Closer",
      description: "Close rate above 30% for a week",
      icon: <Trophy className="h-6 w-6 text-gold-500" />,
      earned: false,
      progress: 85,
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "50 calls in a single day",
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      earned: false,
      progress: 60,
    },
  ]

  const streaks = [
    { type: "Current Call Streak", count: 12, unit: "days", active: true },
    { type: "Best Call Streak", count: 18, unit: "days", active: false },
    { type: "Current Close Streak", count: 3, unit: "days", active: true },
    { type: "Best Close Streak", count: 7, unit: "days", active: false },
  ]

  const personalBests = [
    { metric: "Calls in a Day", value: 47, date: "2024-01-12" },
    { metric: "Close Rate (Daily)", value: "45%", date: "2024-01-08" },
    { metric: "Pitch Quality", value: "9.5/10", date: "2024-01-15" },
    { metric: "Closes in a Day", value: 8, date: "2024-01-10" },
  ]

  const weeklyComparison = [
    { metric: "Trust Rate", thisWeek: 86.4, lastWeek: 82.1, change: 4.3 },
    { metric: "Pitch Rate", thisWeek: 83.9, lastWeek: 79.2, change: 4.7 },
    { metric: "Close Rate", thisWeek: 36.9, lastWeek: 34.2, change: 2.7 },
    { metric: "Pitch Quality", thisWeek: 8.1, lastWeek: 7.8, change: 0.3 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="h-8 w-8 text-purple-600" />
              Performance
            </h1>
            <p className="text-gray-600 mt-1">Track your achievements and personal records</p>
          </div>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={achievement.earned ? "opacity-100" : "opacity-50"}>{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge className="mt-2 bg-green-100 text-green-800">Earned {achievement.date}</Badge>
                      ) : (
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Streaks and Personal Bests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-600" />
                Streaks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {streaks.map((streak, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{streak.type}</div>
                      <div className="text-sm text-gray-600">
                        {streak.active && <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{streak.count}</div>
                      <div className="text-sm text-gray-500">{streak.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Personal Bests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalBests.map((best, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{best.metric}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {best.date}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{best.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Week-over-Week Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {weeklyComparison.map((metric) => (
                <div key={metric.metric} className="p-4 border rounded-lg">
                  <div className="text-sm font-medium text-gray-600">{metric.metric}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {metric.thisWeek}
                        {metric.metric.includes("Rate") ? "%" : metric.metric.includes("Quality") ? "/10" : ""}
                      </div>
                      <div className="text-sm text-gray-500">This Week</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`flex items-center gap-1 ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="font-medium">
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}
                          {metric.metric.includes("Rate") ? "%" : metric.metric.includes("Quality") ? "" : ""}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">vs Last Week</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
