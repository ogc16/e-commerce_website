"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Trash2, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ImagesAdminPage() {
  const { toast } = useToast()
  const [images, setImages] = useState<any>({
    products: [],
    categories: [],
    banners: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("products")

  // Fetch images from our API
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/images")
        const data = await response.json()
        setImages(data)
      } catch (error) {
        console.error("Error fetching images:", error)
        toast({
          title: "Error",
          description: "Failed to load images",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [toast])

  // Handle image upload (simulated)
  const handleUpload = (type: string) => {
    toast({
      title: "Upload Feature",
      description: "In a production app, this would open a file picker to upload new images.",
    })
  }

  // Handle image deletion (simulated)
  const handleDelete = (type: string, id: string) => {
    toast({
      title: "Delete Feature",
      description: "In a production app, this would delete the selected image.",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Image Management</h1>
          <p className="text-muted-foreground">Manage product, category, and banner images</p>
        </div>
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="products" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Product Images</TabsTrigger>
          <TabsTrigger value="categories">Category Images</TabsTrigger>
          <TabsTrigger value="banners">Banner Images</TabsTrigger>
        </TabsList>

        {["products", "categories", "banners"].map((type) => (
          <TabsContent key={type} value={type} className="mt-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-medium capitalize">{type} Images</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleUpload(type)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse"></div>
                    <CardContent className="p-4">
                      <div className="h-4 w-2/3 bg-muted animate-pulse rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images[type]?.map((image: any) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.path || "/placeholder.svg"}
                        alt={image.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{image.name}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500"
                          onClick={() => handleDelete(type, image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{image.path}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && images[type]?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No images found</p>
                <Button className="mt-4" onClick={() => handleUpload(type)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Images
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">Free Stock Image Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Unsplash</h3>
              <p className="text-sm text-muted-foreground mb-4">
                High-quality photos free to use for commercial and noncommercial purposes.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">
                  Visit Unsplash
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Pexels</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Free stock photos, royalty free images & videos shared by creators.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer">
                  Visit Pexels
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Pixabay</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Over 2.6 million high quality stock images, videos and music shared by our community.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://pixabay.com/" target="_blank" rel="noopener noreferrer">
                  Visit Pixabay
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

