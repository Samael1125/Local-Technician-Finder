import {ServiceCategories} from "@/components/service-categories"

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-4xl font-bold text-center mb-12">
        Our Services
      </h1>

      <p className="text-center text-muted-foreground mb-10">
        Explore the different technician services available on TechFinder.
      </p>

      <ServiceCategories />

    </div>
  )
}