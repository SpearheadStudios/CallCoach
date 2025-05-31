"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Trophy, TrendingUp, Crown, Medal, Award, Target } from "lucide-react"

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "You",
      initials: "ME",
      calls: 247,
      closes: 42,
      closeRate: 31.3,
      pitchQuality: 7.8,
      rank: 3,
      isCurrentUser: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      initials: "SJ",
      calls: 312,
      closes: 58,
      closeRate: 38.2,
      pitchQuality: 8.4,
      rank: 1,
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Mike Chen",
      initials: "MC",
      calls: 289,
      closes: 52,
      closeRate: 35.7,
      pitchQuality: 8.1,
      rank: 2,
      isCurrentUser: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      initials: "ED",
      calls: 234,
      closes: 38,
      closeRate: 29.8,
      pitchQuality: 7.6,
      rank: 4,
      isCurrentUser: false,
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      initials: "AR",
      calls: 198,
      closes: 31,
      closeRate: 27.4,
      pitchQuality: 7.2,
      rank: 5,
      isCurrentUser: false,
    },
  ]

  const teamStats = {
    totalCalls: 1280,
    totalCloses: 221,
    avgCloseRate: 32.5,
    avgPitchQuality: 7.8,
    topPerformer: "Sarah Johnson",
    mostImproved: "Mike Chen",
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-yellow-200 bg-yellow-50"
      case 2:
        return "border-gray-200 bg-gray-50"
      case 3:
        return "border-amber-200 bg-amber-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              Team
            </h1>
            <p className="text-gray-600 mt-1">Compare performance with your team members</p>
          </div>
        </div>

        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Team Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{teamStats.totalCalls}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Team Closes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{teamStats.totalCloses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Close Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{teamStats.avgCloseRate}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Pitch Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{teamStats.avgPitchQuality}/10</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Team Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium">Top Performer</div>
                  <div className="text-sm text-gray-600">Highest close rate this month</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-700">{teamStats.topPerformer}</div>
                  <div className="text-sm text-yellow-600">38.2% close rate</div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium">Most Improved</div>
                  <div className="text-sm text-gray-600">Biggest improvement this month</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700">{teamStats.mostImproved}</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12.3% close rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Your Position
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">#3</div>
                <div className="text-sm text-gray-600">Your current rank</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Gap to #2 (Mike Chen)</span>
                  <span className="text-red-600">-4.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Gap to #1 (Sarah Johnson)</span>
                  <span className="text-red-600">-6.9%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lead over #4 (Emily Davis)</span>
                  <span className="text-green-600">+1.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              Team Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 rounded-lg border-2 ${getRankColor(member.rank)} ${
                    member.isCurrentUser ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">{getRankIcon(member.rank)}</div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={member.isCurrentUser ? "bg-blue-100 text-blue-700" : ""}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {member.name}
                          {member.isCurrentUser && <Badge className="bg-blue-100 text-blue-800 text-xs">You</Badge>}
                        </div>
                        <div className="text-sm text-gray-600">Rank #{member.rank}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold">{member.calls}</div>
                        <div className="text-xs text-gray-600">Calls</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{member.closes}</div>
                        <div className="text-xs text-gray-600">Closes</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{member.closeRate}%</div>
                        <div className="text-xs text-gray-600">Close Rate</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{member.pitchQuality}/10</div>
                        <div className="text-xs text-gray-600">Quality</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-6">
                    <Progress value={(member.calls / 350) * 100} className="h-1" />
                    <Progress value={(member.closes / 70) * 100} className="h-1" />
                    <Progress value={member.closeRate * 2.5} className="h-1" />
                    <Progress value={member.pitchQuality * 10} className="h-1" />
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
