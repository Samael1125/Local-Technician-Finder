import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedTechnicians } from "@/components/featured-technicians"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServiceCategories />
        <FeaturedTechnicians />
      </main>
      <Footer />
    </div>
  )
}
