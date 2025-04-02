"use client"

import { useState, useEffect } from "react"
import { Tag, Percent, Clock } from "lucide-react"

import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import AIChatbot from "@/components/ai-chatbot"

export default function SalePage() {
  const [saleProducts, setSaleProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null)
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Simulated data fetching
  useEffect(() => {
    const fetchSaleProducts = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock sale products data
        const productsData = [
          {
            id: "102",
            name: "Travel Duffel Bag",
            price: 89.99,
            image: "/products/travel-duffel.png",
            category: "Bags",
            discount: 15,
          },
          {
            id: "202",
            name: "Smart Watch",
            price: 199.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Electronics",
            discount: 10,
          },
          {
            id: "302",
            name: "Slim Fit Jeans",
            price: 59.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Clothing",
            discount: 20,
          },
          {
            id: "402",
            name: "Sunglasses",
            price: 79.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Accessories",
            discount: 15,
          },
          {
            id: "502",
            name: "Wireless Headphones",
            price: 129.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Electronics",
            discount: 25,
          },
          {
            id: "602",
            name: "Running Shoes",
            price: 99.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Footwear",
            discount: 30,
          },
        ]

        setSaleProducts(productsData)
      } catch (error) {
        console.error("Error fetching sale products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSaleProducts()
  }, [])

  // Get AI discount recommendation
  useEffect(() => {
    const getAiRecommendation = async () => {
      setIsLoadingRecommendation(true)
      try {
        // In a real app, this would be an API call
        const response = await fetch("/api/discount-recommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recentlyViewed: ["2", "3"], // This would come from user session
            previousPurchases: ["4"], // This would come from user history
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get discount recommendation")
        }

        const data = await response.json()
        setAiRecommendation(data.recommendation)
      } catch (error) {
        console.error("Error getting AI recommendation:", error)
        setAiRecommendation("Take an extra 10% off any item in our Electronics category with code TECH10!")
      } finally {
        setIsLoadingRecommendation(false)
      }
    }

    getAiRecommendation()
  }, [])

  // Filter products by category
  const filteredProducts =
    activeTab === "all" ? saleProducts : saleProducts.filter((product) => product.category.toLowerCase() === activeTab)

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sale & Clearance</h1>
        <p className="text-muted-foreground">Shop our latest deals and discounted items</p>
      </div>

      {/* Sale Banner */}
      <div className="mb-8 bg-primary text-primary-foreground rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Summer Sale</h2>
            <p className="text-primary-foreground/80">Up to 30% off select items</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Ends in 3 days</span>
            </div>
            <Button variant="secondary">Shop Now</Button>
          </div>
        </div>
      </div>

      {/* AI Discount Recommendation */}
      {aiRecommendation && (
        <div className="mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-full">
              <Percent className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Personalized Discount</h3>
              <p className="text-sm text-muted-foreground">{aiRecommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Sale</TabsTrigger>
          <TabsTrigger value="clothing">Clothing</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="bags">Bags</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Sale Products */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              discount={product.discount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No sale items found</h3>
          <p className="text-muted-foreground">There are currently no items on sale in this category.</p>
          <Button variant="outline" className="mt-4" onClick={() => setActiveTab("all")}>
            View all sale items
          </Button>
        </div>
      )}

      {/* Discount Information */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Tag className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Clearance Items</h3>
          <p className="text-muted-foreground">Up to 50% off on last season's items</p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold">Buy One, Get One</h3>
          <p className="text-muted-foreground">Select items are buy one, get one 50% off</p>
        </div>
        <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold">Member Discounts</h3>
          <p className="text-muted-foreground">Sign up for an extra 10% off your first order</p>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}

