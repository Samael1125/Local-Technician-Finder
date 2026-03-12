"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Star, MapPin } from "lucide-react"
import Link from "next/link"

const featuredTechnicians = [
  {
    id: 1,
    name: "Mike Johnson",
    specialty: "Home Repairs",
    rating: 4.9,
    reviews: 127,
    location: "Downtown Area",
    avatar: "/professional-technician.png",
    hourlyRate: 75,
    responseTime: "< 2 hours",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    specialty: "Computer Services",
    rating: 4.8,
    reviews: 89,
    location: "Tech District",
    avatar: "/female-tech-professional.png",
    hourlyRate: 85,
    responseTime: "< 1 hour",
    verified: true,
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    specialty: "Vehicle Maintenance",
    rating: 4.9,
    reviews: 156,
    location: "Industrial Zone",
    avatar: "/auto-mechanic-professional.jpg",
    hourlyRate: 65,
    responseTime: "< 3 hours",
    verified: true,
  },
]

export function FeaturedTechnicians() {

  const [search, setSearch] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")

  const filteredTechnicians = featuredTechnicians.filter((tech) => {

    const matchesSearch =
      tech.name.toLowerCase().includes(search.toLowerCase()) ||
      tech.specialty.toLowerCase().includes(search.toLowerCase())

    const matchesService =
      serviceFilter === "all" || tech.specialty === serviceFilter

    return matchesSearch && matchesService
  })

  return (
    <section className="py-16 px-4 bg-muted/30">

      <div className="container">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Top-Rated Technicians</h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet some of our highest-rated professionals ready to help with your projects
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">

          <Input
            placeholder="Search technicians or services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="all">All Services</option>
            <option value="Home Repairs">Home Repairs</option>
            <option value="Computer Services">Computer Services</option>
            <option value="Vehicle Maintenance">Vehicle Maintenance</option>
          </select>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredTechnicians.map((tech) => (

            <Card key={tech.id} className="hover:shadow-lg transition">

              <CardContent className="p-6">

                <div className="flex items-start space-x-4 mb-4">

                  <Avatar className="h-16 w-16">
                    <AvatarImage src={tech.avatar} />
                    <AvatarFallback>
                      {tech.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">

                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{tech.name}</h3>

                      {tech.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {tech.specialty}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">

                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {tech.rating} ({tech.reviews})
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {tech.location}
                      </div>

                    </div>

                  </div>

                </div>

                <div className="space-y-2 mb-4">

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hourly Rate</span>
                    <span className="font-medium">${tech.hourlyRate}/hr</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium text-accent">{tech.responseTime}</span>
                  </div>

                </div>

                <div className="flex gap-2">

                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/technicians/${tech.id}`}>
                      View Profile
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/book/${tech.id}`}>
                      Book Now
                    </Link>
                  </Button>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" asChild>
            <Link href="/technicians">
              View All Technicians
            </Link>
          </Button>
        </div>

      </div>

    </section>
  )
}