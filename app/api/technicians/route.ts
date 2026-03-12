import { type NextRequest, NextResponse } from "next/server"
import type { Technician } from "@/lib/types"

// Mock data for development
const mockTechnicians: Technician[] = [
  {
    id: "1",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "(555) 123-4567",
    specialty: ["Home Repairs", "Plumbing", "Electrical"],
    bio: "Experienced home repair specialist with over 10 years in the field.",
    hourlyRate: 75,
    location: {
      address: "123 Main St",
      city: "Downtown",
      state: "CA",
      zipCode: "90210",
      coordinates: { lat: 34.0522, lng: -118.2437 },
    },
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    responseTime: "< 2 hours",
    availability: {
      monday: [{ start: "09:00", end: "17:00", available: true }],
      tuesday: [{ start: "09:00", end: "17:00", available: true }],
      wednesday: [{ start: "09:00", end: "17:00", available: true }],
      thursday: [{ start: "09:00", end: "17:00", available: true }],
      friday: [{ start: "09:00", end: "17:00", available: true }],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    specialty: ["Computer Services", "IT Support", "Network Setup"],
    bio: "IT professional specializing in computer repair and network solutions.",
    hourlyRate: 85,
    location: {
      address: "456 Tech Ave",
      city: "Tech District",
      state: "CA",
      zipCode: "90211",
      coordinates: { lat: 34.0622, lng: -118.2537 },
    },
    rating: 4.8,
    reviewCount: 89,
    verified: true,
    responseTime: "< 1 hour",
    availability: {
      monday: [{ start: "08:00", end: "18:00", available: true }],
      tuesday: [{ start: "08:00", end: "18:00", available: true }],
      wednesday: [{ start: "08:00", end: "18:00", available: true }],
      thursday: [{ start: "08:00", end: "18:00", available: true }],
      friday: [{ start: "08:00", end: "16:00", available: true }],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const specialty = searchParams.get("specialty")
  const location = searchParams.get("location")

  let filteredTechnicians = mockTechnicians

  if (specialty) {
    filteredTechnicians = filteredTechnicians.filter((tech) =>
      tech.specialty.some((s) => s.toLowerCase().includes(specialty.toLowerCase())),
    )
  }

  if (location) {
    filteredTechnicians = filteredTechnicians.filter(
      (tech) =>
        tech.location.city.toLowerCase().includes(location.toLowerCase()) ||
        tech.location.state.toLowerCase().includes(location.toLowerCase()),
    )
  }

  return NextResponse.json(filteredTechnicians)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real app, you would validate the data and save to database
    const newTechnician: Technician = {
      id: Date.now().toString(),
      ...body,
      rating: 0,
      reviewCount: 0,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json(newTechnician, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create technician" }, { status: 500 })
  }
}
