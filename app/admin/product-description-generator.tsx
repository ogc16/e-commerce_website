"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { generateProductDescription } from "@/app/actions/generate-description"

export default function ProductDescriptionGenerator() {
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [features, setFeatures] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const featuresList = features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)

      const result = await generateProductDescription(productName, category, featuresList, targetAudience)

      if (result.success) {
        setGeneratedDescription(result.description)
      } else {
        setError(result.error || "Failed to generate description")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Product Description Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Premium Leather Backpack"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Bags, Electronics, Clothing, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Key Features (comma separated)</Label>
              <Textarea
                id="features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Genuine leather, Water-resistant, Multiple compartments, Adjustable straps"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience (optional)</Label>
              <Input
                id="targetAudience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Professionals, Students, Outdoor enthusiasts, etc."
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Description"}
            </Button>
          </form>

          {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">{error}</div>}

          {generatedDescription && (
            <div className="mt-6 space-y-2">
              <h3 className="font-medium">Generated Description:</h3>
              <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">{generatedDescription}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(generatedDescription)}
                className="mt-2"
              >
                Copy to Clipboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

