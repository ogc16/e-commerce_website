"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = 10.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/products">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Input placeholder="Discount code" />
                  <Button variant="outline" className="w-full">
                    Apply
                  </Button>
                </div>

                <Link href="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>

                <div className="mt-4 text-center text-xs text-muted-foreground">
                  <p>Secure checkout powered by Paystack</p>
                  <div className="mt-2 flex justify-center gap-2">
                    <img src="/placeholder.svg?height=20&width=30" alt="Visa" className="h-5" />
                    <img src="/placeholder.svg?height=20&width=30" alt="Mastercard" className="h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border py-12">
          <div className="text-center">
            <h2 className="text-xl font-medium">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

