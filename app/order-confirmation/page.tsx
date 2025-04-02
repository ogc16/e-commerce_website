"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, Truck, Home, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { getOrderByReference } from "@/lib/db"
import { clearCart } from "@/lib/cart-utils"
import type { Order } from "@/lib/db"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<Order | null>(null)

  const reference = searchParams.get("reference")

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!reference) {
        toast({
          title: "Error",
          description: "Order reference not found",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)
      try {
        // Fetch order details from the database
        const order = await getOrderByReference(reference)

        if (order) {
          setOrderDetails(order)
          // Clear the cart after successful order
          clearCart()
        } else {
          toast({
            title: "Error",
            description: "Order not found",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching order details:", error)
        toast({
          title: "Error",
          description: "Failed to load order details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [reference, toast])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-8" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find the order details you're looking for.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Order #{orderDetails.id}</h2>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(orderDetails.date).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {orderDetails.status.toUpperCase()}
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Payment: {orderDetails.paymentStatus.toUpperCase()}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Items</h3>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
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
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Customer Information</h3>
                  <div className="text-sm">
                    <p className="font-medium">{orderDetails.customer.name}</p>
                    <p>{orderDetails.customer.email}</p>
                    <p>{orderDetails.customer.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="text-sm">
                    <p>{orderDetails.shipping.address}</p>
                    <p>
                      {orderDetails.shipping.city}, {orderDetails.shipping.state} {orderDetails.shipping.zipCode}
                    </p>
                    <p>{orderDetails.shipping.country}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${orderDetails.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${orderDetails.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Delivery Information</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>
            <div className="space-y-8">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Package className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Order Confirmed</h3>
                <p className="text-sm text-muted-foreground">{new Date(orderDetails.date).toLocaleDateString()}</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Truck className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Shipping</h3>
                <p className="text-sm text-muted-foreground">Estimated to ship in 1-2 business days</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Home className="h-4 w-4" />
                </div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Estimated delivery by{" "}
                  {orderDetails.estimatedDelivery
                    ? new Date(orderDetails.estimatedDelivery).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/account">View Order History</Link>
          </Button>
          <Button asChild>
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

