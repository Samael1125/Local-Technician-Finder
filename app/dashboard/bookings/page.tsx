"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Phone, Star, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Booking } from "@/lib/types"

export default function BookingsDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      // In a real app, you would fetch user's bookings
      const mockBookings: Booking[] = [
        {
          id: "1",
          technicianId: "1",
          customerId: "temp-customer-id",
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
          customerId: "temp-customer-id",
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

  const filterBookings = (status: string) => {
    if (status === "all") return bookings
    return bookings.filter((booking) => booking.status === status)
  }

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
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-4">My Bookings</h1>
          <p className="text-lg text-muted-foreground text-balance">Manage your service appointments</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({filterBookings("pending").length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({filterBookings("confirmed").length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({filterBookings("completed").length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({filterBookings("cancelled").length})</TabsTrigger>
          </TabsList>

          {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {filterBookings(status).length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground mb-4">No {status === "all" ? "" : status} bookings found</p>
                    <Button asChild>
                      <Link href="/technicians">Book a Service</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filterBookings(status).map((booking) => (
                  <Card key={booking.id} className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold">{booking.serviceType}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                {booking.description}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.scheduledDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {booking.timeSlot.start} - {booking.timeSlot.end}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {booking.location.city}, {booking.location.state}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Cost: </span>
                              <span className="font-semibold text-primary">
                                ${booking.actualCost || booking.estimatedCost}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">Booking ID: {booking.id}</div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 lg:ml-6">
                          {booking.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                Reschedule
                              </Button>
                              <Button size="sm" variant="destructive">
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                Reschedule
                              </Button>
                            </>
                          )}
                          {booking.status === "completed" && (
                            <>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                <Star className="h-4 w-4 mr-2" />
                                Leave Review
                              </Button>
                              <Button size="sm" variant="outline" className="bg-transparent">
                                Download Receipt
                              </Button>
                              <Button size="sm" asChild>
                                <Link href={`/technicians/${booking.technicianId}`}>Book Again</Link>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
