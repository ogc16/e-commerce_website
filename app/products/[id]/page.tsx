import Link from "next/link"
import { ArrowLeft, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductReviews from "@/components/product-reviews"
import ProductRecommendations from "@/components/product-recommendations"
import AIChatbot from "@/components/ai-chatbot"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real app, you would fetch product data based on the ID
  const product = {
    id: params.id,
    name: "Premium Leather Backpack",
    price: 129.99,
    description:
      "A premium leather backpack perfect for daily use. Features multiple compartments, adjustable straps, and water-resistant material. Ideal for work, school, or travel.",
    features: [
      "Genuine full-grain leather",
      "Water-resistant coating",
      'Padded laptop sleeve (fits up to 15")',
      "Multiple interior pockets",
      "Adjustable shoulder straps",
      "Durable metal hardware",
    ],
    specifications: {
      Dimensions: '18" x 12" x 6"',
      Weight: "2.5 lbs",
      Material: "Full-grain leather, cotton lining",
      Capacity: "22L",
      Warranty: "Lifetime limited warranty",
    },
    images: [
      "/images/products/backpack.jpg",
      "/images/products/canvas-backpack.jpg",
      "/images/products/messenger-bag.jpg",
      "/images/products/laptop-sleeve.jpg",
    ],
    colors: ["Black", "Brown", "Navy"],
    category: "Bags",
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
  }

  // Sample catalog products for recommendations
  const allProducts = [
    {
      id: "1",
      name: "Minimalist Watch",
      price: 129.99,
      image: "/images/products/watch.jpg",
      category: "Accessories",
    },
    {
      id: "2",
      name: "Leather Backpack",
      price: 89.99,
      image: "/images/products/backpack.jpg",
      category: "Bags",
    },
    {
      id: "3",
      name: "Wireless Earbuds",
      price: 149.99,
      image: "/images/products/earbuds.jpg",
      category: "Electronics",
    },
    {
      id: "4",
      name: "Cotton T-Shirt",
      price: 29.99,
      image: "/images/products/tshirt.jpg",
      category: "Clothing",
    },
    {
      id: "101",
      name: "Canvas Backpack",
      price: 79.99,
      image: "/images/products/canvas-backpack.jpg",
      category: "Bags",
    },
    {
      id: "102",
      name: "Travel Duffel Bag",
      price: 89.99,
      image: "/images/products/travel-duffel.jpg",
      category: "Bags",
      discount: 15,
    },
    {
      id: "103",
      name: "Messenger Bag",
      price: 69.99,
      image: "/images/products/messenger-bag.jpg",
      category: "Bags",
    },
    {
      id: "104",
      name: "Laptop Sleeve",
      price: 29.99,
      image: "/images/products/laptop-sleeve.jpg",
      category: "Bags",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-md border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">In stock: {product.stock} available</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Color</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button key={color} variant="outline" size="sm">
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Quantity</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    -
                  </Button>
                  <span className="w-8 text-center">1</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>
                  This premium leather backpack combines style, durability, and functionality. Crafted from high-quality
                  full-grain leather, it develops a beautiful patina over time, making each bag unique to its owner. The
                  spacious main compartment easily accommodates your daily essentials, while the padded laptop sleeve
                  keeps your device secure.
                </p>
                <p>
                  Whether you're commuting to work, heading to class, or embarking on a weekend adventure, this
                  versatile backpack is the perfect companion. Its timeless design ensures it never goes out of style,
                  while the robust construction means it's built to last for years to come.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <ul className="grid gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      ✓
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 items-center gap-4 border-b pb-2">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <ProductReviews productId={product.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16">
          <ProductRecommendations currentProduct={product} allProducts={allProducts} />
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}

