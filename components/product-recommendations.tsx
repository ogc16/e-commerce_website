"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  discount?: number
}

interface ProductRecommendationsProps {
  currentProduct: Product
  allProducts: Product[]
}

export default function ProductRecommendations({ currentProduct, allProducts }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock user history - in a real app, this would come from a user session or database
  const mockUserHistory = {
    viewed: ["2", "3"],
    purchased: ["4"],
  }

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: allProducts,
            userHistory: mockUserHistory,
            currentProduct,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations")
        }

        const data = await response.json()
        setRecommendations(data.recommendations || [])
      } catch (err) {
        console.error("Error fetching recommendations:", err)
        setError("Failed to load personalized recommendations")
        // Fallback to random products
        setRecommendations(
          allProducts
            .filter((p) => p.id !== currentProduct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4),
        )
      } finally {
        setLoading(false)
      }
    }

    if (currentProduct && allProducts.length > 0) {
      fetchRecommendations()
    }
  }, [currentProduct, allProducts])

  if (error) {
    return (
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">You May Also Like</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendations.map((product) => (
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
      </div>
    )
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Personalized For You</h3>
        <Button variant="ghost" size="sm" className="text-sm">
          View More
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendations.map((product) => (
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
      )}
    </div>
  )
}

