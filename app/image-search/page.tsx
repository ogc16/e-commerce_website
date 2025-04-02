"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, Search, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import ProductCard from "@/components/product-card"

export default function ImageSearchPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Create image preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Simulate image search
    simulateImageSearch(file)
  }

  const simulateImageSearch = async (file: File) => {
    setIsLoading(true)
    setSearchResults(null)

    try {
      // In a real app, you would upload the image to your server/API
      // and get back visual search results
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock results based on random products
      const mockProducts = [
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
          price: 129.99,
          image: "/products/wireless-earbuds.png",
          category: "Electronics",
          discount: 15,
        },
        {
          id: "4",
          name: "Cotton T-Shirt",
          price: 29.99,
          image: "/products/cotton-tshirt.png",
          category: "Clothing",
        },
      ]

      setSearchResults(mockProducts)

      toast({
        title: "Search Complete",
        description: `Found ${mockProducts.length} similar products`,
      })
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetSearch = () => {
    setImagePreview(null)
    setSearchResults(null)
  }

  const captureImage = () => {
    // This would open the camera in a real implementation
    // For demo purposes, we'll just show a toast
    toast({
      title: "Camera Access",
      description: "Camera functionality would open here in a real implementation.",
    })
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Visual Search</h1>
        <p className="text-muted-foreground">Upload an image or take a photo to find similar products in our store</p>
      </div>

      {!imagePreview ? (
        <div
          className={`mx-auto max-w-md rounded-lg border-2 border-dashed p-12 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">Drag and drop an image</h3>
          <p className="mb-4 text-sm text-muted-foreground">or click to browse from your device</p>
          <div className="space-y-2">
            <Button asChild>
              <label>
                <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                Browse Files
              </label>
            </Button>
            <Button variant="outline" onClick={captureImage}>
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative h-64 w-64 overflow-hidden rounded-lg border">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Uploaded image"
                className="h-full w-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                onClick={resetSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-medium">{isLoading ? "Analyzing image..." : "Search results"}</h2>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  <p>Looking for similar products...</p>
                </div>
              ) : searchResults ? (
                <p>Found {searchResults.length} products that match your image</p>
              ) : null}
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetSearch}>
                  New Search
                </Button>
                <Button asChild>
                  <label>
                    <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    Upload Different Image
                  </label>
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square animate-pulse bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 w-2/3 animate-pulse rounded bg-muted"></div>
                      <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchResults ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {searchResults.map((product) => (
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
          ) : null}
        </div>
      )}

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">How Visual Search Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Upload or Capture</h3>
            <p className="text-sm text-muted-foreground">
              Take a photo or upload an image of a product you're interested in finding.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-medium">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes the image to identify key features, colors, and styles.
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
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">Find Matches</h3>
            <p className="text-sm text-muted-foreground">
              We show you similar products from our catalog that match what you're looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

