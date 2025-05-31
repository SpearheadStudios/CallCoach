"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Phone, Search, Filter, Download, Calendar, Clock, Star, Handshake, MessageSquare, Users } from "lucide-react"

export default function CallHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOutcome, setFilterOutcome] = useState("all")
  const [filterDistance, setFilterDistance] = useState("all")

  // Mock call history data
  const callHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "09:30 AM",
      pitchDistance: "pickup",
      outcome: "not-now",
      pitchQuality: null,
      notes: "Interested but timing not right, follow up in Q2",
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "10:15 AM",
      pitchDistance: "booked-meeting",
      outcome: "booked-meeting",
      pitchQuality: 8.5,
      notes: "Great conversation, demo scheduled for next week",
    },
    {
      id: 3,
      date: "2024-01-15",
      time: "11:00 AM",
      pitchDistance: "permission",
      outcome: "not-me",
      pitchQuality: null,
      notes: "Wrong decision maker, got referral to CTO",
    },
    {
      id: 4,
      date: "2024-01-15",
      time: "02:30 PM",
      pitchDistance: "pitch",
      outcome: "no-use-case",
      pitchQuality: 7.0,
      notes: "Good pitch but they don't have the problem we solve",
    },
    {
      id: 5,
      date: "2024-01-14",
      time: "03:45 PM",
      pitchDistance: "booked-meeting",
      outcome: "booked-meeting",
      pitchQuality: 9.0,
      notes: "Excellent call, very interested, contract discussion next",
    },
  ]

  const getOutcomeBadge = (outcome: string) => {
    const variants = {
      "booked-meeting": "bg-green-100 text-green-800",
      "not-me": "bg-blue-100 text-blue-800",
      "not-now": "bg-yellow-100 text-yellow-800",
      "no-use-case": "bg-red-100 text-red-800",
    }
    return variants[outcome as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getDistanceIcon = (distance: string) => {
    switch (distance) {
      case "pickup":
        return <Phone className="h-4 w-4" />
      case "permission":
        return <Users className="h-4 w-4" />
      case "pitch":
        return <MessageSquare className="h-4 w-4" />
      case "booked-meeting":
        return <Handshake className="h-4 w-4" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  const filteredHistory = callHistory.filter((call) => {
    const matchesSearch = call.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOutcome = filterOutcome === "all" || call.outcome === filterOutcome
    const matchesDistance = filterDistance === "all" || call.pitchDistance === filterDistance
    return matchesSearch && matchesOutcome && matchesDistance
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Phone className="h-8 w-8 text-blue-600" />
                Call History
              </h1>
              <p className="text-gray-600 mt-1">Review and analyze your call records</p>
            </div>
          </div>

          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterOutcome} onValueChange={setFilterOutcome}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="booked-meeting">Booked Meeting</SelectItem>
                  <SelectItem value="not-me">Not Me</SelectItem>
                  <SelectItem value="not-now">Not Now</SelectItem>
                  <SelectItem value="no-use-case">No Use Case</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDistance} onValueChange={setFilterDistance}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Distances</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="permission">Permission</SelectItem>
                  <SelectItem value="pitch">Pitch</SelectItem>
                  <SelectItem value="booked-meeting">Booked Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Call History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls ({filteredHistory.length} records)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredHistory.map((call) => (
                <div key={call.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {call.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {call.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {call.pitchQuality && (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {call.pitchQuality}/10
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getDistanceIcon(call.pitchDistance)}
                      <span className="text-sm font-medium capitalize">{call.pitchDistance.replace("-", " ")}</span>
                    </div>
                    <Badge className={getOutcomeBadge(call.outcome)}>
                      {call.outcome.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </div>

                  {call.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">{call.notes}</p>
                    </div>
                  )}
                </div>
              ))}

              {filteredHistory.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No calls found matching your filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
