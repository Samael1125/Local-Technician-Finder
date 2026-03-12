import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "TechFinder - Local Technician Services",
  description: "Find verified local technicians for home, computer, and vehicle repairs",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

          {/* Header */}
          <Header />

          {/* Centered Page Content */}
          <main className="container mx-auto px-6 py-10 min-h-screen">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>

          {/* Footer */}
          <Footer />

        </ThemeProvider>

        <Analytics />

      </body>
    </html>
  )
}