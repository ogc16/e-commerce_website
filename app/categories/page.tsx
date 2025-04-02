import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AIChatbot from "@/components/ai-chatbot"

export default function CategoriesPage() {
  const categories = [
    {
      id: "clothing",
      name: "Clothing",
      image: "/categories/clothing.png",
      description: "Stylish and comfortable clothing for everyday wear",
      count: 120,
    },
    {
      id: "electronics",
      name: "Electronics",
      image: "/categories/electronics.png",
      description: "The latest gadgets and tech accessories",
      count: 85,
    },
    {
      id: "accessories",
      name: "Accessories",
      image: "/categories/accessories.png",
      description: "Complete your look with our range of accessories",
      count: 64,
    },
    {
      id: "home",
      name: "Home & Living",
      image: "/categories/home-living.png",
      description: "Elevate your living space with our home collection",
      count: 97,
    },
    {
      id: "bags",
      name: "Bags",
      image: "/products/leather-backpack.png",
      description: "Functional and stylish bags for every occasion",
      count: 42,
    },
    {
      id: "shoes",
      name: "Shoes",
      image: "/placeholder.svg?height=300&width=300",
      description: "Comfortable and trendy footwear for all seasons",
      count: 56,
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop by Category</h1>
        <p className="text-muted-foreground">Browse our wide selection of products across popular categories</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md h-full">
              <div className="aspect-video overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{category.count} products</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}

