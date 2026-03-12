import { Card, CardContent } from "@/components/ui/card"
import { Home, Monitor, Car, Smartphone, Zap, Wrench } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    icon: Home,
    title: "Home Repairs",
    description: "Plumbing, electrical, HVAC, and general maintenance",
    count: "150+ technicians",
  },
  {
    icon: Monitor,
    title: "Computer Services",
    description: "PC repair, data recovery, network setup, and IT support",
    count: "80+ technicians",
  },
  {
    icon: Car,
    title: "Vehicle Maintenance",
    description: "Auto repair, diagnostics, oil changes, and inspections",
    count: "120+ technicians",
  },
  {
    icon: Smartphone,
    title: "Device Repair",
    description: "Phone, tablet, and electronics repair services",
    count: "60+ technicians",
  },
  {
    icon: Zap,
    title: "Electrical Work",
    description: "Wiring, installations, and electrical troubleshooting",
    count: "90+ technicians",
  },
  {
    icon: Wrench,
    title: "General Services",
    description: "Appliance repair, furniture assembly, and more",
    count: "200+ technicians",
  },
]

export function ServiceCategories() {
  return (
    <section className="py-16 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Popular Service Categories</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Find qualified technicians for any job, from quick fixes to major projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.title} href={`/services/${category.title.toLowerCase().replace(" ", "-")}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{category.description}</p>
                        <p className="text-xs font-medium text-accent">{category.count}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
