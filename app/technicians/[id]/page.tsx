"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Star, Clock, MapPin } from "lucide-react"

import type { Technician } from "@/lib/types"

export default function TechnicianProfile() {

  const params = useParams()
  const [technician, setTechnician] = useState<Technician | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTechnician()
  }, [])

  const fetchTechnician = async () => {
    try {

      const res = await fetch("/api/technicians")
      const data = await res.json()

      const tech = data.find((t: Technician) => String(t.id) === params.id)

      setTechnician(tech)

    } catch (error) {
      console.error("Error loading technician", error)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Loading technician profile...
      </div>
    )
  }

  if (!technician) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        Technician not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-10">

      <div className="max-w-6xl mx-auto px-6">

        <Card className="p-8">

          <CardContent className="grid md:grid-cols-3 gap-8">

            {/* Left section */}
            <div className="flex flex-col items-center text-center">

              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={technician.avatar} />
                <AvatarFallback>
                  {technician.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-2xl font-bold">{technician.name}</h2>

              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/>
                {technician.rating} ({technician.reviewCount})
              </div>

              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {technician.specialty.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>

            </div>


            {/* Middle section */}
            <div className="space-y-4">

              <h3 className="text-lg font-semibold">About</h3>

              <p className="text-muted-foreground">
                {technician.bio}
              </p>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4"/>
                Responds in {technician.responseTime}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
  <MapPin className="h-4 w-4" />
  {technician.location.address}, {`${technician.location.city}, ${technician.location.state}`}
</div>

            </div>
            <Card className="mt-8">
  <CardHeader>
    <CardTitle>Customer Reviews</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    {technician.reviews && technician.reviews.length > 0 ? (
      technician.reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">

          <div className="flex items-center justify-between mb-1">
            <span className="font-medium">{review.user}</span>

            <span className="text-yellow-500">
              {"⭐".repeat(review.rating)}
            </span>
          </div>

          <p className="text-muted-foreground text-sm">
            {review.comment}
          </p>

        </div>
      ))
    ) : (
      <p className="text-muted-foreground">
        No reviews yet.
      </p>
    )}
  </CardContent>
</Card>

            {/* Right section */}
            <div className="space-y-4">

              <Card className="p-6">

                <h3 className="text-lg font-semibold mb-4">
                  Booking Info
                </h3>

                <div className="flex justify-between mb-2">
                  <span>Hourly Rate</span>
                  <span className="font-semibold">
                    ${technician.hourlyRate}/hr
                  </span>
                </div>

                <Button
                  className="w-full mt-6"
                  size="lg"
                  asChild
                >
                  <Link href={`/book/${technician.id}`}>
                    Book Now
                  </Link>
                </Button>

              </Card>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}