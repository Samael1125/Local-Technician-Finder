"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Calendar, Clock, MapPin, DollarSign } from "lucide-react"
import type { Booking } from "@/lib/types"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      // In a real app, you would fetch all bookings from API
      const mockBookings: Booking[] = [
        {
          id: "1",
          technicianId: "1",
          customerId: "customer-1",
          serviceType: "Computer Services",
          description: "Laptop running slow, needs optimization",
          scheduledDate: new Date("2024-02-15"),
          timeSlot: { start: "10:00", end: "12:00" },
          status: "confirmed",
          location: {
            address: "123 Main St",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90210",
          },
          estimatedCost: 150,
          createdAt: new Date("2024-02-10"),
          updatedAt: new Date("2024-02-10"),
        },
        {
          id: "2",
          technicianId: "2",
          customerId: "customer-2",
          serviceType: "Home Repairs",
          description: "Fix leaky kitchen faucet",
          scheduledDate: new Date("2024-02-08"),
          timeSlot: { start: "14:00", end: "15:00" },
          status: "completed",
          location: {
            address: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90211",
          },
          estimatedCost: 75,
          actualCost: 85,
          createdAt: new Date("2024-02-05"),
          updatedAt: new Date("2024-02-08"),
        },
        {
          id: "3",
          technicianId: "1",
          customerId: "customer-3",
          serviceType: "Vehicle Maintenance",
          description: "Oil change and basic inspection",
          scheduledDate: new Date("2024-02-20"),
          timeSlot: { start: "09:00", end: "10:00" },
          status: "pending",
          location: {
            address: "789 Pine St",
            city: "Beverly Hills",
            state: "CA",
            zipCode: "90212",
          },
          estimatedCost: 65,
          createdAt: new Date("2024-02-12"),
          updatedAt: new Date("2024-02-12"),
        },
      ]
      setBookings(mockBookings)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getBookingStats = () => {
    const total = bookings.length
    const pending = bookings.filter((b) => b.status === "pending").length
    const confirmed = bookings.filter((b) => b.status === "confirmed").length
    const completed = bookings.filter((b) => b.status === "completed").length
    const cancelled = bookings.filter((b) => b.status === "cancelled").length

    return { total, pending, confirmed, completed, cancelled }
  }

  const stats = getBookingStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">Loading bookings...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-4">Booking Management</h1>
          <p className="text-lg text-muted-foreground text-balance">Monitor and manage all platform bookings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Total Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <p className="text-xs text-muted-foreground">Cancelled</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-mono text-sm">#{booking.id}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.serviceType}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-48">{booking.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{booking.scheduledDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {booking.timeSlot.start} - {booking.timeSlot.end}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {booking.location.city}, {booking.location.state}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">${booking.actualCost || booking.estimatedCost}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                          <DialogDescription>Complete booking information</DialogDescription>
                        </DialogHeader>
                        {selectedBooking && (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{selectedBooking.serviceType}</h3>
                                <p className="text-sm text-muted-foreground">Booking ID: #{selectedBooking.id}</p>
                              </div>
                              <Badge className={getStatusColor(selectedBooking.status)}>
                                {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                              </Badge>
                            </div>

                            <div>
                              <p className="font-medium mb-2">Service Description</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {selectedBooking.description}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium mb-2">Date & Time</p>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{selectedBooking.scheduledDate.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {selectedBooking.timeSlot.start} - {selectedBooking.timeSlot.end}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium mb-2">Cost</p>
                                <div className="space-y-1 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Estimated: </span>
                                    <span>${selectedBooking.estimatedCost}</span>
                                  </div>
                                  {selectedBooking.actualCost && (
                                    <div>
                                      <span className="text-muted-foreground">Actual: </span>
                                      <span className="font-semibold">${selectedBooking.actualCost}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="font-medium mb-2">Service Location</p>
                              <div className="text-sm text-muted-foreground">
                                <p>{selectedBooking.location.address}</p>
                                <p>
                                  {selectedBooking.location.city}, {selectedBooking.location.state}{" "}
                                  {selectedBooking.location.zipCode}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Technician ID</p>
                                <p className="text-muted-foreground">{selectedBooking.technicianId}</p>
                              </div>
                              <div>
                                <p className="font-medium">Customer ID</p>
                                <p className="text-muted-foreground">{selectedBooking.customerId}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Created</p>
                                <p className="text-muted-foreground">{selectedBooking.createdAt.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="font-medium">Last Updated</p>
                                <p className="text-muted-foreground">{selectedBooking.updatedAt.toLocaleString()}</p>
                              </div>
                            </div>

                            {selectedBooking.notes && (
                              <div>
                                <p className="font-medium mb-2">Notes</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{selectedBooking.notes}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {filteredBookings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No bookings found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
