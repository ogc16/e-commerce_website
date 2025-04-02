"use client"

import { useState, useEffect } from "react"
import { Filter, SlidersHorizontal, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import ProductCard from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import AIChatbot from "@/components/ai-chatbot"
import FallbackSuggestion from "@/components/fallback-suggestion"

export default function ProductsPage() {
  const [products, setProducts] = useState([
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
    {
      id: "3",
      name: "Wireless Earbuds",
      price: 149.99,
      image: "/products/wireless-earbuds.png",
      category: "Electronics",
    },
    {
      id: "4",
      name: "Cotton T-Shirt",
      price: 29.99,
      image: "/products/cotton-tshirt.png",
      category: "Clothing",
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
  ])

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortOption, setSortOption] = useState("featured")
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)
  const [isLoadingAiSuggestion, setIsLoadingAiSuggestion] = useState(false)

  const categories = [
    { id: "accessories", name: "Accessories" },
    { id: "bags", name: "Bags" },
    { id: "clothing", name: "Clothing" },
    { id: "electronics", name: "Electronics" },
  ]

  // AI-powered search
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true)
        try {
          // In a real app, this would be an API call to your AI search endpoint
          // For demo purposes, we'll simulate a search with a timeout
          await new Promise((resolve) => setTimeout(resolve, 800))

          // Simple search implementation (would be replaced by AI search in production)
          const results = products.filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          setFilteredProducts(results)
        } catch (error) {
          console.error("Search error:", error)
        } finally {
          setIsSearching(false)
        }
      } else if (searchQuery.trim() === "") {
        applyFilters()
      }
    }, 500)

    return () => clearTimeout(delaySearch)
  }, [searchQuery])

  // Apply filters and sorting
  const applyFilters = () => {
    let filtered = [...products]

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category.toLowerCase()))
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
  }

  useEffect(() => {
    if (searchQuery.trim() === "") {
      applyFilters()
    }
  }, [selectedCategories, priceRange, sortOption])

  // Get AI shopping suggestion
  const getAiSuggestion = async () => {
    setIsLoadingAiSuggestion(true)
    try {
      // In a real app, this would be an API call to your AI suggestion endpoint
      const response = await fetch("/api/shopping-suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCategories,
          priceRange,
          recentlyViewed: ["2", "3"], // This would come from user session
        }),
      })

      const data = await response.json()
      setAiSuggestion(data.suggestion || "Check out our latest arrivals, handpicked for quality and style!")
    } catch (error) {
      console.error("Error getting AI suggestion:", error)
      // Set a fallback suggestion
      setAiSuggestion("Check out our latest arrivals, handpicked for quality and style!")
    } finally {
      setIsLoadingAiSuggestion(false)
    }
  }

  useEffect(() => {
    getAiSuggestion()
  }, [])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category.toLowerCase())
        ? prev.filter((c) => c !== category.toLowerCase())
        : [...prev, category.toLowerCase()],
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-muted-foreground">Browse our collection of high-quality products</p>
      </div>

      {/* AI Shopping Suggestion */}
      {aiSuggestion ? (
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
              <h3 className="font-medium text-sm">AI Shopping Assistant</h3>
              <p className="text-sm text-muted-foreground">{aiSuggestion}</p>
            </div>
          </div>
        </div>
      ) : isLoadingAiSuggestion ? (
        <div className="mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="bg-primary/30 p-2 rounded-full w-8 h-8"></div>
            <div className="w-full">
              <div className="h-4 bg-primary/30 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-primary/20 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ) : (
        <FallbackSuggestion categories={selectedCategories} priceRange={priceRange} />
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
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-${category.id}`}
                        checked={selectedCategories.includes(category.name.toLowerCase())}
                        onCheckedChange={() => toggleCategory(category.name)}
                      />
                      <label
                        htmlFor={`mobile-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
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
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.name.toLowerCase())}
                    onCheckedChange={() => toggleCategory(category.name)}
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
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
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
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

          {/* Applied Filters */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="outline" className="flex items-center gap-1">
                  {category}
                  <button onClick={() => toggleCategory(category)} className="ml-1 rounded-full hover:bg-muted">
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {category} filter</span>
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setSelectedCategories([])}>
                Clear all
              </Button>
            </div>
          )}

          {/* Products */}
          {isSearching ? (
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
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategories([])
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

