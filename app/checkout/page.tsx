"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [checkoutMode, setCheckoutMode] = useState<"guest" | "login">("guest")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
    paymentMethod: "paystack",
  })
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Simulated data fetching
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call or from a state management store
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock cart items
        const items = [
          {
            id: "1",
            name: "Premium Leather Backpack",
            price: 129.99,
            image: "/products/premium-backpack-1.png",
            quantity: 1,
          },
          {
            id: "2",
            name: "Wireless Earbuds",
            price: 89.99,
            image: "/products/wireless-earbuds.png",
            quantity: 2,
          },
        ]

        setCartItems(items)
      } catch (error) {
        console.error("Error fetching cart items:", error)
        toast({
          title: "Error",
          description: "Failed to load cart items. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartItems()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStatus("processing")

    try {
      // Simulate login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo, any login works
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      })

      // Simulate fetching user data
      setFormData({
        ...formData,
        firstName: "John",
        lastName: "Doe",
        email: loginData.email,
        phone: "555-123-4567",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      })

      setPaymentStatus("idle")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
      setPaymentStatus("idle")
    }
  }

  const initializePaystack = async () => {
    try {
      setPaymentStatus("processing")

      // Call your backend to initialize Paystack payment
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          amount: Math.round(total * 100), // Paystack expects amount in kobo (smallest currency unit)
          metadata: {
            customer_name: `${formData.firstName} ${formData.lastName}`,
            customer_phone: formData.phone,
            cart_items: cartItems.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
            shipping_address: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country,
            },
            is_guest: checkoutMode === "guest",
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to initialize payment")
      }

      const data = await response.json()

      // Redirect to Paystack checkout page
      window.location.href = data.authorization_url
    } catch (error) {
      console.error("Payment initialization error:", error)
      setPaymentStatus("error")
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"]

    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Initialize payment based on selected method
    if (formData.paymentMethod === "paystack") {
      initializePaystack()
    }
  }

  // Check for payment verification from URL (after Paystack redirect)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const reference = queryParams.get("reference")

    if (reference) {
      const verifyPayment = async () => {
        try {
          setPaymentStatus("processing")

          const response = await fetch(`/api/paystack/verify?reference=${reference}`, {
            method: "GET",
          })

          if (!response.ok) {
            throw new Error("Payment verification failed")
          }

          const data = await response.json()

          if (data.status === "success") {
            setPaymentStatus("success")
            toast({
              title: "Payment Successful",
              description: "Your order has been placed successfully!",
            })

            // Clear cart and redirect to order confirmation
            setTimeout(() => {
              router.push(`/order-confirmation?reference=${reference}`)
            }, 2000)
          } else {
            throw new Error("Payment was not successful")
          }
        } catch (error) {
          console.error("Payment verification error:", error)
          setPaymentStatus("error")
          toast({
            title: "Payment Failed",
            description: "We couldn't verify your payment. Please contact support.",
            variant: "destructive",
          })
        }
      }

      verifyPayment()
    }
  }, [router, toast])

  if (paymentStatus === "success") {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been placed successfully. We're redirecting you to the order confirmation page.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/order-confirmation">View Order Details</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (paymentStatus === "error") {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't process your payment. Please try again or contact our support team for assistance.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/cart">Return to Cart</Link>
            </Button>
            <Button onClick={() => setPaymentStatus("idle")}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Checkout Form */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <Tabs defaultValue="guest" onValueChange={(value) => setCheckoutMode(value as "guest" | "login")}>
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="guest">Guest Checkout</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="guest">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="paystack" id="paystack" />
                        <Label htmlFor="paystack" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          <span>Paystack</span>
                        </Label>
                        <div className="ml-auto flex items-center gap-2">
                          <img src="/placeholder.svg?height=20&width=30" alt="Visa" className="h-5" />
                          <img src="/placeholder.svg?height=20&width=30" alt="Mastercard" className="h-5" />
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" disabled={paymentStatus === "processing"}>
                    {paymentStatus === "processing" ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                      </>
                    ) : (
                      <>Pay ₦{Math.round(total * 100) / 100}</>
                    )}
                  </Button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="login">
              <div className="space-y-6">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/20 p-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Login to Your Account</h3>
                      <p className="text-xs text-muted-foreground">Use your existing account for faster checkout</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={paymentStatus === "processing"}>
                    {paymentStatus === "processing" ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Logging in...
                      </>
                    ) : (
                      "Login & Continue"
                    )}
                  </Button>
                </form>

                <div className="text-center text-sm">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>

              {isLoading ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
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
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="mt-6 text-sm text-muted-foreground">
                    <p>
                      By completing your purchase, you agree to our{" "}
                      <Link href="#" className="underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-sm">
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
                className="text-green-500"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Secure checkout powered by Paystack</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
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
                className="text-green-500"
              >
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
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
                className="text-green-500"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>30-day easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

