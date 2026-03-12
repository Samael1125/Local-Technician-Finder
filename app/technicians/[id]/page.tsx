"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, Phone, Mail, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Technician, Review } from "@/lib/types"

export default function TechnicianProfilePage() {
  const params = useParams()
  const [technician, setTechnician] = useState<Technician | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchTechnicianProfile(params.id as string)
    }
  }, [params.id])

  const fetchTechnicianProfile = async (id: string) => {
    try {
      // In a real app, you would fetch from API
      const response = await fetch("/api/technicians")
      const technicians = await response.json()
      const tech = technicians.find((t: Technician) => t.id === id)

      if (tech) {
        setTechnician(tech)
        // Mock reviews for demo
        setReviews([
          {
            id: "1",
            bookingId: "1",
            technicianId: id,
            customerId: "1",
            rating: 5,
            comment: "Excellent work! Fixed my computer quickly and professionally.",
            createdAt: new Date("2024-01-15"),
          },
          {
            id: "2",
            bookingId: "2",
            technicianId: id,
            customerId: "2",
            rating: 4,
            comment: "Great service, arrived on time and got the job done.",
            createdAt: new Date("2024-01-10"),
          },
        ])
      }
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch technician:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">Loading profile...</div>
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={technician.avatar || "/placeholder.svg"} alt={technician.name} />
                    <AvatarFallback className="text-lg">
                      {technician.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-2xl font-bold">{technician.name}</h1>
                      {technician.verified && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{technician.rating}</span>
                        <span>({technician.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {technician.location.city}, {technician.location.state}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Responds in {technician.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {technician.specialty.map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{technician.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{technician.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{technician.email}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hourly Rate:</span>
                  <span className="text-2xl font-bold text-primary">${technician.hourlyRate}/hr</span>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.createdAt.toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/book/${technician.id}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(technician.availability).map(([day, slots]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="capitalize font-medium">{day}:</span>
                    <span className="text-muted-foreground">
                      {slots.length > 0 ? `${slots[0].start} - ${slots[0].end}` : "Unavailable"}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Service Area</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>{technician.location.address}</p>
                  <p>
                    {technician.location.city}, {technician.location.state} {technician.location.zipCode}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
