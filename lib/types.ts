export interface Technician {
  id: string
  name: string
  email: string
  phone: string
  specialty: string[]
  bio: string
  hourlyRate: number
  location: {
    address: string
    city: string
    state: string
    zipCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  avatar?: string
  rating: number
  reviewCount: number
  verified: boolean
  responseTime: string
  availability: {
    [key: string]: TimeSlot[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export interface Booking {
  id: string
  technicianId: string
  customerId: string
  serviceType: string
  description: string
  scheduledDate: Date
  timeSlot: {
    start: string
    end: string
  }
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  location: {
    address: string
    city: string
    state: string
    zipCode: string
  }
  estimatedCost: number
  actualCost?: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  bookingId: string
  technicianId: string
  customerId: string
  rating: number
  comment: string
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "customer" | "technician" | "admin"
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
