"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, SlidersHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import ProductCard from "@/components/product-card"
import AIChatbot from "@/components/ai-chatbot"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortOption, setSortOption] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [aiCategoryInsight, setAiCategoryInsight] = useState<string | null>(null)
  const [isLoadingInsight, setIsLoadingInsight] = useState(false)

  // Simulated data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock category data
        const categoryData = {
          id: params.id,
          name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
          description: `Explore our collection of ${params.id} products, designed for quality and style.`,
          image: `/categories/${params.id}.png`,
        }

        // Mock products data
        let productsData = []

        if (params.id === "bags") {
          productsData = [
            {
              id: "2",
              name: "Leather Backpack",
              price: 89.99,
              image: "/products/leather-backpack.png",
              category: "Bags",
            },
            {
              id: "101",
              name: "Canvas Backpack",
              price: 79.99,
              image: "/products/canvas-backpack.png",
              category: "Bags",
            },
            {
              id: "102",
              name: "Travel Duffel Bag",
              price: 89.99,
              image: "/products/travel-duffel.png",
              category: "Bags",
              discount: 15,
            },
            {
              id: "103",
              name: "Messenger Bag",
              price: 69.99,
              image: "/products/messenger-bag.png",
              category: "Bags",
            },
            {
              id: "104",
              name: "Laptop Sleeve",
              price: 29.99,
              image: "/products/laptop-sleeve.png",
              category: "Bags",
            },
          ]
        } else if (params.id === "electronics") {
          productsData = [
            {
              id: "3",
              name: "Wireless Earbuds",
              price: 149.99,
              image: "/products/wireless-earbuds.png",
              category: "Electronics",
            },
            {
              id: "201",
              name: "Bluetooth Speaker",
              price: 79.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Electronics",
            },
            {
              id: "202",
              name: "Smart Watch",
              price: 199.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Electronics",
              discount: 10,
            },
          ]
        } else if (params.id === "clothing") {
          productsData = [
            {
              id: "4",
              name: "Cotton T-Shirt",
              price: 29.99,
              image: "/products/cotton-tshirt.png",
              category: "Clothing",
            },
            {
              id: "301",
              name: "Denim Jacket",
              price: 89.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Clothing",
            },
            {
              id: "302",
              name: "Slim Fit Jeans",
              price: 59.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Clothing",
              discount: 20,
            },
          ]
        } else if (params.id === "accessories") {
          productsData = [
            {
              id: "1",
              name: "Minimalist Watch",
              price: 129.99,
              image: "/products/minimalist-watch.png",
              category: "Accessories",
            },
            {
              id: "401",
              name: "Leather Wallet",
              price: 49.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Accessories",
            },
            {
              id: "402",
              name: "Sunglasses",
              price: 79.99,
              image: "/placeholder.svg?height=300&width=300",
              category: "Accessories",
              discount: 15,
            },
          ]
        } else {
          // Default products if category not found
          productsData = [
            {
              id: "1",
              name: "Minimalist Watch",
              price: 129.99,
              image: "/products/minimalist-watch.png",
              category: "Accessories",
            },
            {
              id: "2",
              name: "Leather Backpack",
              price: 89.99,
              image: "/products/leather-backpack.png",
              category: "Bags",
            },
          ]
        }

        setCategory(categoryData)
        setProducts(productsData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  // Get AI category insight
  useEffect(() => {
    const getAiCategoryInsight = async () => {
      if (!category) return

      setIsLoadingInsight(true)
      try {
        // In a real app, this would be an API call
        const response = await fetch("/api/category-insight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryId: params.id,
            categoryName: category.name,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get category insight")
        }

        const data = await response.json()
        setAiCategoryInsight(data.insight)
      } catch (error) {
        console.error("Error getting category insight:", error)
        setAiCategoryInsight(
          `Our ${category.name} collection features premium quality items designed for style and functionality.`,
        )
      } finally {
        setIsLoadingInsight(false)
      }
    }

    if (category) {
      getAiCategoryInsight()
    }
  }, [category, params.id])

  // Apply filters and sorting
  useEffect(() => {
    if (!products.length) return

    let filtered = [...products]

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // In a real app, you would sort by date
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      default:
        // Featured - no specific sorting
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, priceRange, sortOption])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Categories
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      {/* AI Category Insight */}
      {aiCategoryInsight && (
        <div className="mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-sm">AI Category Insight</h3>
              <p className="text-sm text-muted-foreground">{aiCategoryInsight}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Filters - Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 md:hidden">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow down products by applying filters</SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider defaultValue={[0, 200]} max={200} step={1} value={priceRange} onValueChange={setPriceRange} />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider defaultValue={[0, 200]} max={200} step={1} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
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
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setPriceRange([0, 200])
                  setSortOption("featured")
                }}
              >
                Reset all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}

