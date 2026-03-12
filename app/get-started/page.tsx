import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GetStartedPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-4xl font-bold mb-6">
        Welcome to TechFinder
      </h1>

      <p className="text-muted-foreground mb-10 max-w-xl">
        Find trusted technicians near you for home repair, computer services,
        and vehicle maintenance.
      </p>

      <div className="flex gap-4">

        <Button asChild size="lg">
          <Link href="/technicians">
            Browse Technicians
          </Link>
        </Button>

        <Button variant="outline" size="lg" asChild>
          <Link href="/become-technician">
            Become a Technician
          </Link>
        </Button>

      </div>

    </div>
  )
}