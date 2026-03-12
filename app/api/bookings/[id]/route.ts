import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In a real app, you would fetch the specific booking from database
    const mockBooking = {
      id: params.id,
      technicianId: "1",
      customerId: "temp-customer-id",
      serviceType: "Computer Services",
      description: "Laptop running slow, needs optimization",
      scheduledDate: new Date(),
      timeSlot: { start: "10:00", end: "12:00" },
      status: "confirmed",
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

    return NextResponse.json(mockBooking)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, notes } = body

    // In a real app, you would update the booking in database
    const updatedBooking = {
      id: params.id,
      status,
      notes,
      updatedAt: new Date(),
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}
