import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AIChatbot from "@/components/ai-chatbot"

export default function FeaturedPage() {
  // Sample featured products
  const featuredProducts = [
    {
      id: "1",
      name: "Minimalist Watch",
      price: 129.99,
      image: "/products/minimalist-watch.png",
      category: "Accessories",
      highlight: "Best Seller",
    },
    {
      id: "2",
      name: "Leather Backpack",
      price: 89.99,
      image: "/products/leather-backpack.png",
      category: "Bags",
      highlight: "Staff Pick",
    },
    {
      id: "3",
      name: "Wireless Earbuds",
      price: 149.99,
      image: "/products/wireless-earbuds.png",
      category: "Electronics",
      highlight: "Top Rated",
    },
    {
      id: "4",
      name: "Cotton T-Shirt",
      price: 29.99,
      image: "/products/cotton-tshirt.png",
      category: "Clothing",
      highlight: "Customer Favorite",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold">Featured Products</h1>
        <p className="text-muted-foreground">Our handpicked selection of exceptional products</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-64 w-full object-cover" />
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                {product.highlight}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{product.name}</h3>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">5.0 (120 reviews)</span>
              </div>
              <Link href={`/products/${product.id}`}>
                <Button className="w-full mt-4">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why These Products Are Featured</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Customer Favorites</h3>
            <p className="text-sm text-muted-foreground">
              Products that consistently receive high ratings and positive reviews from our customers.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">
              Exceptional craftsmanship and materials that meet our highest standards for durability and design.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">Staff Picks</h3>
            <p className="text-sm text-muted-foreground">
              Personally selected by our team for their unique features and exceptional value.
            </p>
          </div>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}

