import Link from "next/link"
import { Wrench } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TechFinder</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting you with trusted local technicians for all your repair and maintenance needs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services/home-repairs" className="hover:text-foreground transition-colors">
                  Home Repairs
                </Link>
              </li>
              <li>
                <Link href="/services/computer-services" className="hover:text-foreground transition-colors">
                  Computer Services
                </Link>
              </li>
              <li>
                <Link href="/services/vehicle-maintenance" className="hover:text-foreground transition-colors">
                  Vehicle Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/device-repair" className="hover:text-foreground transition-colors">
                  Device Repair
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/become-technician" className="hover:text-foreground transition-colors">
                  Become a Technician
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TechFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
