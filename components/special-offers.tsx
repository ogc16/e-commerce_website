import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SpecialOffers() {
  const offers = [
    {
      id: "offer1",
      title: "Summer Sale",
      description: "Up to 50% off on selected items",
      image: "/images/products/backpack.jpg",
      badge: "Limited Time",
      link: "/sale",
    },
    {
      id: "offer2",
      title: "New Arrivals",
      description: "Check out our latest products",
      image: "/images/products/watch.jpg",
      badge: "New",
      link: "/products",
    },
    {
      id: "offer3",
      title: "Free Shipping",
      description: "On orders over $50",
      image: "/images/products/earbuds.jpg",
      badge: "Special",
      link: "/products",
    },
  ]

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Special Offers</h2>
          <Link href="/sale">
            <Button variant="link" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <Link key={offer.id} href={offer.link} className="block">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative">
                  <img src={offer.image || "/placeholder.svg"} alt={offer.title} className="h-48 w-full object-cover" />
                  <Badge className="absolute right-2 top-2 bg-primary">{offer.badge}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-1 text-xl font-bold">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

