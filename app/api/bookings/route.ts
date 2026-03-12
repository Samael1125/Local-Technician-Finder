import { type NextRequest, NextResponse } from "next/server"
import type { Booking } from "@/lib/types"

// Mock data for development
const mockBookings: Booking[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const technicianId = searchParams.get("technicianId")
  const customerId = searchParams.get("customerId")

  let filteredBookings = mockBookings

  if (technicianId) {
    filteredBookings = filteredBookings.filter((booking) => booking.technicianId === technicianId)
  }

  if (customerId) {
    filteredBookings = filteredBookings.filter((booking) => booking.customerId === customerId)
  }

  return NextResponse.json(filteredBookings)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real app, you would validate the data and save to database
    const newBooking: Booking = {
      id: Date.now().toString(),
      ...body,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockBookings.push(newBooking)

    return NextResponse.json(newBooking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
