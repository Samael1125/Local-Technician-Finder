"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, Mail, Download } from "lucide-react"
import Link from "next/link"
import type { Booking } from "@/lib/types"

export default function BookingConfirmationPage() {
  const params = useParams()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchBooking(params.id as string)
    }
  }, [params.id])

  const fetchBooking = async (id: string) => {
    try {
      // In a real app, you would fetch the specific booking
      // For now, we'll create a mock booking
      const mockBooking: Booking = {
        id,
        technicianId: "1",
        customerId: "temp-customer-id",
        serviceType: "General Repair",
        description: "Computer not starting up properly",
        scheduledDate: new Date(),
        timeSlot: { start: "10:00", end: "12:00" },
        status: "pending",
        location: {
          address: "123 Main St",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90210",
        },
        estimatedCost: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setBooking(mockBooking)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch booking:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">Loading confirmation...</div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-balance mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground text-balance">Your appointment has been successfully scheduled</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  Booking ID: {booking.id}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.scheduledDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.timeSlot.start} - {booking.timeSlot.end}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-2">Service Type</p>
                  <Badge variant="outline">{booking.serviceType}</Badge>
                </div>

                <div>
                  <p className="font-medium mb-2">Description</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{booking.description}</p>
                </div>

                <Separator />

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Service Location</p>
                    <div className="text-sm text-muted-foreground">
                      <p>{booking.location.address}</p>
                      <p>
                        {booking.location.city}, {booking.location.state} {booking.location.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a detailed confirmation email with all booking information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Technician Contact</p>
                      <p className="text-sm text-muted-foreground">
                        The technician will contact you 24 hours before the appointment to confirm details.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Service Completion</p>
                      <p className="text-sm text-muted-foreground">
                        After the service, you'll receive an invoice and can leave a review.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span>${booking.estimatedCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee:</span>
                    <span>$0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">${booking.estimatedCost}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Final cost may vary based on actual work performed</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/dashboard/bookings">
                    <User className="h-4 w-4 mr-2" />
                    View My Bookings
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>(555) 123-TECH</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>support@techfinder.com</span>
                </div>
                <p className="text-muted-foreground">Available 24/7 for booking support and emergency assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/technicians">Book Another Service</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
