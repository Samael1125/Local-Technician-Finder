"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, MapPin, Star, User, Phone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Technician } from "@/lib/types"

const serviceTypes = [
  "General Repair",
  "Installation",
  "Maintenance",
  "Troubleshooting",
  "Consultation",
  "Emergency Service",
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const [technician, setTechnician] = useState<Technician | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceType: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    estimatedDuration: "1",
  })

  useEffect(() => {
    if (params.id) {
      fetchTechnician(params.id as string)
    }
  }, [params.id])

  useEffect(() => {
    if (selectedDate && technician) {
      fetchAvailableSlots()
    }
  }, [selectedDate, technician])

  const fetchTechnician = async (id: string) => {
    try {
      const response = await fetch("/api/technicians")
      const technicians = await response.json()
      const tech = technicians.find((t: Technician) => t.id === id)
      setTechnician(tech)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch technician:", error)
      setLoading(false)
    }
  }

  const fetchAvailableSlots = () => {
    if (!selectedDate || !technician) return

    const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "lowercase" })
    const dayAvailability = technician.availability[dayName]

    if (dayAvailability && dayAvailability.length > 0) {
      // In a real app, you would check against existing bookings
      const available = timeSlots.filter((slot) => {
        const slotTime = slot.replace(":", "")
        const startTime = dayAvailability[0].start.replace(":", "")
        const endTime = dayAvailability[0].end.replace(":", "")
        return slotTime >= startTime && slotTime < endTime
      })
      setAvailableSlots(available)
    } else {
      setAvailableSlots([])
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateEstimatedCost = () => {
    if (!technician || !bookingData.estimatedDuration) return 0
    return technician.hourlyRate * Number.parseFloat(bookingData.estimatedDuration)
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !technician) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          technicianId: technician.id,
          customerId: "temp-customer-id", // In real app, get from auth
          serviceType: bookingData.serviceType,
          description: bookingData.description,
          scheduledDate: selectedDate,
          timeSlot: {
            start: selectedTime,
            end: `${Number.parseInt(selectedTime.split(":")[0]) + Number.parseInt(bookingData.estimatedDuration)}:${selectedTime.split(":")[1]}`,
          },
          location: {
            address: bookingData.address,
            city: bookingData.city,
            state: bookingData.state,
            zipCode: bookingData.zipCode,
          },
          estimatedCost: calculateEstimatedCost(),
          customerInfo: {
            name: bookingData.customerName,
            email: bookingData.customerEmail,
            phone: bookingData.customerPhone,
          },
        }),
      })

      if (response.ok) {
        const booking = await response.json()
        router.push(`/booking-confirmation/${booking.id}`)
      }
    } catch (error) {
      console.error("Failed to create booking:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">Loading booking form...</div>
        </div>
      </div>
    )
  }

  if (!technician) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Technician Not Found</h1>
            <Button asChild>
              <Link href="/technicians">Browse Technicians</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const isFormValid =
    bookingData.customerName &&
    bookingData.customerEmail &&
    bookingData.customerPhone &&
    bookingData.serviceType &&
    bookingData.description &&
    bookingData.address &&
    bookingData.city &&
    bookingData.state &&
    bookingData.zipCode &&
    selectedDate &&
    selectedTime

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-4">Book an Appointment</h1>
          <p className="text-lg text-muted-foreground text-balance">Schedule your service with {technician.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Your Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <Input
                      id="customerName"
                      value={bookingData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email Address *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={bookingData.customerEmail}
                      onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    value={bookingData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Select
                      value={bookingData.serviceType}
                      onValueChange={(value) => handleInputChange("serviceType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedDuration">Estimated Duration (hours) *</Label>
                    <Select
                      value={bookingData.estimatedDuration}
                      onValueChange={(value) => handleInputChange("estimatedDuration", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">30 minutes</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="1.5">1.5 hours</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">Full day (8 hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Service Description *</Label>
                  <Textarea
                    id="description"
                    value={bookingData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Please describe the issue or service needed in detail..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Service Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Service Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={bookingData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={bookingData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Los Angeles"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={bookingData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={bookingData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="90210"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5" />
                  <span>Select Date & Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Select Date *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <Label>Available Time Slots *</Label>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {availableSlots.length > 0 ? (
                          availableSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant={selectedTime === slot ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(slot)}
                              className="justify-center"
                            >
                              {slot}
                            </Button>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground col-span-2">No available slots for this date</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Please select a date first</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technician Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={technician.avatar || "/placeholder.svg"} alt={technician.name} />
                    <AvatarFallback>
                      {technician.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{technician.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{technician.rating}</span>
                      <span>({technician.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {technician.specialty.slice(0, 2).map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{technician.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{technician.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Responds in {technician.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span>{bookingData.serviceType || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{selectedDate ? selectedDate.toLocaleDateString() : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{selectedTime || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{bookingData.estimatedDuration} hour(s)</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hourly Rate:</span>
                    <span>${technician.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Estimated Total:</span>
                    <span className="text-primary">${calculateEstimatedCost()}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  You will receive a confirmation email after booking
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
