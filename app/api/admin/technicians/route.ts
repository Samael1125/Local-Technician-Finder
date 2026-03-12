import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  // In a real app, you would fetch from database with admin authentication
  const pendingTechnicians = [
    {
      id: "pending-1",
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 987-6543",
      specialty: ["Vehicle Maintenance", "Auto Repair"],
      bio: "Experienced auto mechanic with 8 years in the industry. Specialized in engine diagnostics and repair.",
      location: {
        address: "789 Auto St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90213",
        coordinates: { lat: 34.0522, lng: -118.2437 },
      },
      hourlyRate: 70,
      responseTime: "< 4 hours",
      availability: {
        monday: [{ start: "08:00", end: "18:00", available: true }],
        tuesday: [{ start: "08:00", end: "18:00", available: true }],
        wednesday: [{ start: "08:00", end: "18:00", available: true }],
        thursday: [{ start: "08:00", end: "18:00", available: true }],
        friday: [{ start: "08:00", end: "17:00", available: true }],
      },
      applicationDate: new Date("2024-02-10"),
      status: "pending" as const,
    },
    {
      id: "pending-2",
      name: "Lisa Wang",
      email: "lisa@example.com",
      phone: "(555) 456-7890",
      specialty: ["Electrical Work", "Home Repairs"],
      bio: "Licensed electrician with expertise in residential and commercial electrical systems.",
      location: {
        address: "456 Electric Ave",
        city: "Beverly Hills",
        state: "CA",
        zipCode: "90210",
        coordinates: { lat: 34.0736, lng: -118.4004 },
      },
      hourlyRate: 95,
      responseTime: "< 2 hours",
      availability: {
        monday: [{ start: "07:00", end: "16:00", available: true }],
        tuesday: [{ start: "07:00", end: "16:00", available: true }],
        wednesday: [{ start: "07:00", end: "16:00", available: true }],
        thursday: [{ start: "07:00", end: "16:00", available: true }],
        friday: [{ start: "07:00", end: "15:00", available: true }],
      },
      applicationDate: new Date("2024-02-12"),
      status: "pending" as const,
    },
  ]

  return NextResponse.json(pendingTechnicians)
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, action } = await request.json()

    // In a real app, you would update the technician status in database
    if (action === "approve") {
      // Update technician status to verified
      return NextResponse.json({ message: "Technician approved" })
    } else if (action === "reject") {
      // Update technician status to rejected
      return NextResponse.json({ message: "Technician rejected" })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update technician status" }, { status: 500 })
  }
}
