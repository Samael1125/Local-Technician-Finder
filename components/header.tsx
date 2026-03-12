"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Wrench } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">TechFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/services"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/technicians"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Find Technicians
          </Link>
          <Link
            href="/become-technician"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Become a Technician
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex bg-transparent">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            <Link
              href="/services"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/technicians"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Find Technicians
            </Link>
            <Link
              href="/become-technician"
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Become a Technician
            </Link>
            <Link href="/admin" className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              Admin
            </Link>
            <div className="pt-2 border-t">
              <Button variant="outline" size="sm" asChild className="w-full mb-2 bg-transparent">
  <Link href="/sign-in">Sign In</Link>
</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
