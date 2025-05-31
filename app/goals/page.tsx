"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, Edit, Trash2, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function Goals() {
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    period: "daily",
    metric: "calls",
  })

  const goals = [
    {
      id: 1,
      title: "Daily Calls",
      target: 50,
      current: 42,
      period: "daily",
      metric: "calls",
      status: "in-progress",
      daysLeft: 0,
    },
    {
      id: 2,
      title: "Weekly Close Rate",
      target: 35,
      current: 36.9,
      period: "weekly",
      metric: "close-rate",
      status: "achieved",
      daysLeft: 2,
    },
    {
      id: 3,
      title: "Monthly Closes",
      target: 100,
      current: 78,
      period: "monthly",
      metric: "closes",
      status: "in-progress",
      daysLeft: 8,
    },
    {
      id: 4,
      title: "Pitch Quality",
      target: 8.5,
      current: 8.1,
      period: "weekly",
      metric: "pitch-quality",
      status: "at-risk",
      daysLeft: 2,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "achieved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "at-risk":
        return "bg-yellow-100 text-yellow-800"
      case "missed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "achieved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "at-risk":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "missed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target) {
      // Add goal logic here
      setNewGoal({ title: "", target: "", period: "daily", metric: "calls" })
      setShowAddGoal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="h-8 w-8 text-green-600" />
                Goals
              </h1>
              <p className="text-gray-600 mt-1">Set and track your performance targets</p>
            </div>
          </div>

          <Button onClick={() => setShowAddGoal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Goal
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddGoal && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">Create New Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Target value"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal((prev) => ({ ...prev, target: e.target.value }))}
                />
                <Select
                  value={newGoal.period}
                  onValueChange={(value) => setNewGoal((prev) => ({ ...prev, period: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={newGoal.metric}
                  onValueChange={(value) => setNewGoal((prev) => ({ ...prev, metric: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calls">Calls</SelectItem>
                    <SelectItem value="closes">Closes</SelectItem>
                    <SelectItem value="close-rate">Close Rate (%)</SelectItem>
                    <SelectItem value="pitch-quality">Pitch Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddGoal}>Create Goal</Button>
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(goal.status)}>
                      {getStatusIcon(goal.status)}
                      <span className="ml-1 capitalize">{goal.status.replace("-", " ")}</span>
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {goal.current}
                      {goal.metric.includes("rate") ? "%" : goal.metric.includes("quality") ? "/10" : ""}
                    </div>
                    <div className="text-sm text-gray-600">
                      of {goal.target}
                      {goal.metric.includes("rate") ? "%" : goal.metric.includes("quality") ? "/10" : ""} target
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {Math.round(calculateProgress(goal.current, goal.target))}%
                    </div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>

                <Progress value={calculateProgress(goal.current, goal.target)} className="h-3" />

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="capitalize">{goal.period}</span>
                  </div>
                  <div className="text-gray-600">
                    {goal.daysLeft === 0 ? "Due today" : `${goal.daysLeft} days left`}
                  </div>
                </div>

                {goal.status === "achieved" && (
                  <div className="p-2 bg-green-50 rounded-md border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      Goal achieved! Great work!
                    </div>
                  </div>
                )}

                {goal.status === "at-risk" && (
                  <div className="p-2 bg-yellow-50 rounded-md border border-yellow-200">
                    <div className="text-yellow-700 text-sm">
                      You need {(goal.target - goal.current).toFixed(1)} more to reach your goal.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
