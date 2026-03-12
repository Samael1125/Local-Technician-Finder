"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, User, MapPin, Briefcase, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

const specialties = [
  "Home Repairs",
  "Computer Services",
  "Vehicle Maintenance",
  "Device Repair",
  "Electrical Work",
  "Plumbing",
  "HVAC",
  "Appliance Repair",
  "Network Setup",
  "Data Recovery",
]

export default function BecomeTechnicianPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    bio: "",

    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Professional Info
    specialty: [] as string[],
    hourlyRate: "",
    experience: "",
    certifications: "",

    // Availability
    availability: {
      monday: { available: false, start: "09:00", end: "17:00" },
      tuesday: { available: false, start: "09:00", end: "17:00" },
      wednesday: { available: false, start: "09:00", end: "17:00" },
      thursday: { available: false, start: "09:00", end: "17:00" },
      friday: { available: false, start: "09:00", end: "17:00" },
      saturday: { available: false, start: "09:00", end: "17:00" },
      sunday: { available: false, start: "09:00", end: "17:00" },
    },

    // Terms
    agreeToTerms: false,
    agreeToBackground: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialty: prev.specialty.includes(specialty)
        ? prev.specialty.filter((s) => s !== specialty)
        : [...prev.specialty, specialty],
    }))
  }

  const handleAvailabilityChange = (day: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/technicians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            coordinates: { lat: 0, lng: 0 }, // Would be geocoded in real app
          },
          hourlyRate: Number.parseInt(formData.hourlyRate),
        }),
      })

      if (response.ok) {
        router.push("/become-technician/success")
      }
    } catch (error) {
      console.error("Failed to submit application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Location", icon: MapPin },
    { number: 3, title: "Professional", icon: Briefcase },
    { number: 4, title: "Pricing", icon: DollarSign },
    { number: 5, title: "Review", icon: CheckCircle },
  ]

  return (
  <div className="min-h-screen bg-background py-10 flex justify-center">

    <div className="max-w-4xl w-full px-6">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Join Our Network of Technicians
        </h1>
        <p className="text-lg text-muted-foreground">
          Start earning by helping customers in your area
        </p>
      </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                          ? "border-primary text-primary"
                          : "border-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell customers about your experience and expertise..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Los Angeles"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="90210"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Professional Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Specialties * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialty}
                          checked={formData.specialty.includes(specialty)}
                          onCheckedChange={() => handleSpecialtyToggle(specialty)}
                        />
                        <Label htmlFor={specialty} className="text-sm">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="certifications">Certifications & Licenses</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange("certifications", e.target.value)}
                    placeholder="List any relevant certifications, licenses, or training..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Pricing */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (USD) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                      placeholder="75"
                      className="pl-8"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Set your hourly rate. You can adjust this later.</p>
                </div>

                <div>
                  <Label>Weekly Availability *</Label>
                  <div className="space-y-3 mt-2">
                    {Object.entries(formData.availability).map(([day, schedule]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 w-24">
                          <Checkbox
                            checked={schedule.available}
                            onCheckedChange={(checked) => handleAvailabilityChange(day, "available", checked)}
                          />
                          <Label className="capitalize text-sm">{day}</Label>
                        </div>
                        {schedule.available && (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={schedule.start}
                              onChange={(e) => handleAvailabilityChange(day, "start", e.target.value)}
                              className="w-32"
                            />
                            <span className="text-muted-foreground">to</span>
                            <Input
                              type="time"
                              value={schedule.end}
                              onChange={(e) => handleAvailabilityChange(day, "end", e.target.value)}
                              className="w-32"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Application Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Name:</strong> {formData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {formData.phone}
                      </p>
                      <p>
                        <strong>Location:</strong> {formData.city}, {formData.state}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Specialties:</strong> {formData.specialty.join(", ")}
                      </p>
                      <p>
                        <strong>Experience:</strong> {formData.experience}
                      </p>
                      <p>
                        <strong>Hourly Rate:</strong> ${formData.hourlyRate}/hr
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                    />
                    <Label className="text-sm">
                      I agree to the{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.agreeToBackground}
                      onCheckedChange={(checked) => handleInputChange("agreeToBackground", checked)}
                    />
                    <Label className="text-sm">I consent to a background check and verification process</Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  disabled={
                    (currentStep === 1 && (!formData.name || !formData.email || !formData.phone || !formData.bio)) ||
                    (currentStep === 2 &&
                      (!formData.address || !formData.city || !formData.state || !formData.zipCode)) ||
                    (currentStep === 3 && (formData.specialty.length === 0 || !formData.experience)) ||
                    (currentStep === 4 && !formData.hourlyRate)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreeToTerms || !formData.agreeToBackground || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
