import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import AIChatbot from "@/components/ai-chatbot"

export default function NewArrivalsPage() {
  // Sample new arrivals products
  const newProducts = [
    {
      id: "new1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
    },
    {
      id: "new2",
      name: "Organic Cotton Hoodie",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
    },
    {
      id: "new3",
      name: "Smart Fitness Tracker",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
    },
    {
      id: "new4",
      name: "Sustainable Bamboo Tumbler",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Living",
    },
    {
      id: "new5",
      name: "Recycled Nylon Backpack",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Bags",
    },
    {
      id: "new6",
      name: "Minimalist Wall Clock",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Home & Living",
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
        <h1 className="text-3xl font-bold">New Arrivals</h1>
        <p className="text-muted-foreground">Discover our latest products, fresh off the shelves</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {newProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>

      <AIChatbot />
    </div>
  )
}

