import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedCategories() {
  const categories = [
    {
      id: "clothing",
      name: "Clothing",
      image: "/categories/clothing.png",
      count: 120,
    },
    {
      id: "electronics",
      name: "Electronics",
      image: "/categories/electronics.png",
      count: 85,
    },
    {
      id: "accessories",
      name: "Accessories",
      image: "/categories/accessories.png",
      count: 64,
    },
    {
      id: "home",
      name: "Home & Living",
      image: "/categories/home-living.png",
      count: 97,
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop by Category</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Browse our wide selection of products across popular categories.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} products</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

