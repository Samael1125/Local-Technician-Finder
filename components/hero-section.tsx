import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
          Find <span className="text-primary">Trusted Local</span> Technicians
        </h1>
        <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
          Connect with verified professionals for home repairs, computer services, and vehicle maintenance. Book
          appointments instantly and get quality work done right.
        </p>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 p-2 bg-card rounded-lg border shadow-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="What service do you need?"
                className="pl-10 border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Enter your location" className="pl-10 border-0 bg-transparent focus-visible:ring-0" />
            </div>
            <Button size="lg" className="md:px-8">
              Search
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/technicians">Browse Technicians</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/become-technician">Join as Technician</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
