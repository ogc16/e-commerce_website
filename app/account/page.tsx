"use client"

import { useState, useEffect } from "react"
import { User, Package, Heart, Settings, LogOut, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/product-card"
import AIChatbot from "@/components/ai-chatbot"

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [aiPersonalization, setAiPersonalization] = useState<string | null>(null)
  const [isLoadingPersonalization, setIsLoadingPersonalization] = useState(false)

  // Simulated data fetching
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock user data
        const userData = {
          id: "user123",
          name: "Alex Johnson",
          email: "alex@example.com",
          avatar: "/avatars/user-1.png",
          orders: [
            {
              id: "ORD-1234",
              date: "2023-06-15",
              total: 219.98,
              status: "Delivered",
              items: [
                {
                  id: "2",
                  name: "Leather Backpack",
                  price: 89.99,
                  image: "/products/leather-backpack.png",
                  quantity: 1,
                },
                {
                  id: "3",
                  name: "Wireless Earbuds",
                  price: 129.99,
                  image: "/products/wireless-earbuds.png",
                  quantity: 1,
                },
              ],
            },
            {
              id: "ORD-5678",
              date: "2023-05-22",
              total: 29.99,
              status: "Delivered",
              items: [
                {
                  id: "4",
                  name: "Cotton T-Shirt",
                  price: 29.99,
                  image: "/products/cotton-tshirt.png",
                  quantity: 1,
                },
              ],
            },
          ],
          wishlist: [
            {
              id: "1",
              name: "Minimalist Watch",
              price: 129.99,
              image: "/products/minimalist-watch.png",
              category: "Accessories",
            },
            {
              id: "102",
              name: "Travel Duffel Bag",
              price: 89.99,
              image: "/products/travel-duffel.png",
              category: "Bags",
              discount: 15,
            },
          ],
        }

        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Get AI personalization
  useEffect(() => {
    const getAiPersonalization = async () => {
      if (!user) return

      setIsLoadingPersonalization(true)
      try {
        // In a real app, this would be an API call
        const response = await fetch("/api/user-personalization", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            orders: user.orders,
            wishlist: user.wishlist,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get personalization")
        }

        const data = await response.json()
        setAiPersonalization(data.personalization)
      } catch (error) {
        console.error("Error getting AI personalization:", error)
        setAiPersonalization(
          "Based on your recent purchases, you might enjoy our new collection of premium accessories.",
        )
      } finally {
        setIsLoadingPersonalization(false)
      }
    }

    if (user) {
      getAiPersonalization()
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Package className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* AI Personalization */}
          {aiPersonalization && (
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
                  <h3 className="font-medium text-sm">Personalized For You</h3>
                  <p className="text-sm text-muted-foreground">{aiPersonalization}</p>
                </div>
              </div>
            </div>
          )}

          <Tabs defaultValue="orders">
            <TabsList className="mb-6">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="details">Account Details</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <h3 className="text-lg font-medium mb-4">Your Orders</h3>
              <div className="space-y-4">
                {user.orders.map((order: any) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-base">Order #{order.id}</CardTitle>
                          <CardDescription>{new Date(order.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-md">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Buy Again
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wishlist">
              <h3 className="text-lg font-medium mb-4">Your Wishlist</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {user.wishlist.map((product: any) => (
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
            </TabsContent>

            <TabsContent value="details">
              <h3 className="text-lg font-medium mb-4">Account Details</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                      <p>January 2023</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-sm text-muted-foreground">
                      123 Main Street
                      <br />
                      Apt 4B
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Edit Address
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Payment Methods</h4>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted p-2 rounded">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}

