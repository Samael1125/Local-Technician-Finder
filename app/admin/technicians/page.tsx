"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Check, X, Star, MapPin, Phone, Mail } from "lucide-react"
import type { Technician } from "@/lib/types"

interface PendingApplication extends Omit<Technician, "id" | "rating" | "reviewCount" | "verified"> {
  id: string
  applicationDate: Date
  status: "pending" | "approved" | "rejected"
}

export default function AdminTechniciansPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | PendingApplication | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTechnicians()
    fetchPendingApplications()
  }, [])

  const fetchTechnicians = async () => {
    try {
      const response = await fetch("/api/technicians")
      const data = await response.json()
      setTechnicians(data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch technicians:", error)
      setLoading(false)
    }
  }

  const fetchPendingApplications = async () => {
    try {
      const response = await fetch("/api/admin/technicians")
      const data = await response.json()
      setPendingApplications(data)
    } catch (error) {
      console.error("Failed to fetch pending applications:", error)
    }
  }

  const handleApplicationAction = async (id: string, action: "approve" | "reject") => {
    try {
      const response = await fetch("/api/admin/technicians", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      })

      if (response.ok) {
        // Refresh the applications list
        fetchPendingApplications()
        if (action === "approve") {
          fetchTechnicians()
        }
      }
    } catch (error) {
      console.error("Failed to update application:", error)
    }
  }

  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.specialty.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tech.location.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && tech.verified) ||
      (statusFilter === "unverified" && !tech.verified)

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">Loading technicians...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-4">Technician Management</h1>
          <p className="text-lg text-muted-foreground text-balance">Manage technicians and review applications</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Technicians ({technicians.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Applications ({pendingApplications.length})</TabsTrigger>
          </TabsList>

          {/* Active Technicians */}
          <TabsContent value="active" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search technicians..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Technicians Table */}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Technician</TableHead>
                    <TableHead>Specialties</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTechnicians.map((technician) => (
                    <TableRow key={technician.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={technician.avatar || "/placeholder.svg"} alt={technician.name} />
                            <AvatarFallback>
                              {technician.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{technician.name}</p>
                            <p className="text-sm text-muted-foreground">{technician.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {technician.specialty.slice(0, 2).map((spec) => (
                            <Badge key={spec} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {technician.specialty.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{technician.specialty.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {technician.location.city}, {technician.location.state}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{technician.rating}</span>
                          <span className="text-xs text-muted-foreground">({technician.reviewCount})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={technician.verified ? "default" : "secondary"}>
                          {technician.verified ? "Verified" : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedTechnician(technician)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Technician Details</DialogTitle>
                            </DialogHeader>
                            {selectedTechnician && (
                              <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage
                                      src={selectedTechnician.avatar || "/placeholder.svg"}
                                      alt={selectedTechnician.name}
                                    />
                                    <AvatarFallback>
                                      {selectedTechnician.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{selectedTechnician.name}</h3>
                                    <p className="text-muted-foreground">{selectedTechnician.bio}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{selectedTechnician.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{selectedTechnician.phone}</span>
                                  </div>
                                </div>

                                <div>
                                  <p className="font-medium mb-2">Specialties</p>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedTechnician.specialty.map((spec) => (
                                      <Badge key={spec} variant="secondary">
                                        {spec}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <p className="font-medium mb-2">Location</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedTechnician.location.address}
                                    <br />
                                    {selectedTechnician.location.city}, {selectedTechnician.location.state}{" "}
                                    {selectedTechnician.location.zipCode}
                                  </p>
                                </div>

                                {"rating" in selectedTechnician && (
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="font-medium">Rating</p>
                                      <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>{selectedTechnician.rating}</span>
                                        <span className="text-muted-foreground">
                                          ({selectedTechnician.reviewCount} reviews)
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="font-medium">Hourly Rate</p>
                                      <p className="text-lg font-semibold text-primary">
                                        ${selectedTechnician.hourlyRate}/hr
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Pending Applications */}
          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Applications</CardTitle>
                <p className="text-sm text-muted-foreground">Review and approve new technician applications</p>
              </CardHeader>
              <CardContent>
                {pendingApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No pending applications</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingApplications.map((application) => (
                      <Card key={application.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-lg font-semibold">{application.name}</h3>
                                <Badge variant="outline">New Application</Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{application.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{application.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {application.location.city}, {application.location.state}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <p className="font-medium mb-2">Specialties</p>
                                  <div className="flex flex-wrap gap-1">
                                    {application.specialty.map((spec) => (
                                      <Badge key={spec} variant="secondary" className="text-xs">
                                        {spec}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="font-medium mb-2">Bio</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{application.bio}</p>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                  Applied: {application.applicationDate.toLocaleDateString()}
                                </div>
                                <div className="text-sm font-medium">Hourly Rate: ${application.hourlyRate}/hr</div>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-2 ml-6">
                              <Button
                                size="sm"
                                onClick={() => handleApplicationAction(application.id, "approve")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleApplicationAction(application.id, "reject")}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedTechnician(application)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Application Details</DialogTitle>
                                    <DialogDescription>Review the complete application</DialogDescription>
                                  </DialogHeader>
                                  {selectedTechnician && (
                                    <div className="space-y-4">
                                      <div>
                                        <h3 className="text-lg font-semibold mb-2">{selectedTechnician.name}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                          {selectedTechnician.bio}
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                          <Mail className="h-4 w-4 text-muted-foreground" />
                                          <span>{selectedTechnician.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Phone className="h-4 w-4 text-muted-foreground" />
                                          <span>{selectedTechnician.phone}</span>
                                        </div>
                                      </div>

                                      <div>
                                        <p className="font-medium mb-2">Complete Address</p>
                                        <p className="text-sm text-muted-foreground">
                                          {selectedTechnician.location.address}
                                          <br />
                                          {selectedTechnician.location.city}, {selectedTechnician.location.state}{" "}
                                          {selectedTechnician.location.zipCode}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="font-medium mb-2">All Specialties</p>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedTechnician.specialty.map((spec) => (
                                            <Badge key={spec} variant="secondary">
                                              {spec}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <p className="font-medium mb-2">Pricing</p>
                                        <p className="text-lg font-semibold text-primary">
                                          ${selectedTechnician.hourlyRate}/hour
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button
                                      onClick={() => handleApplicationAction(selectedTechnician!.id, "approve")}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve Application
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleApplicationAction(selectedTechnician!.id, "reject")}
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Reject Application
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
