// This is a simple in-memory database for demonstration
// In a real app, you would use a proper database like PostgreSQL, MongoDB, etc.

import type { CartItem } from "./cart-utils"

// Define types
export interface Order {
  id: string
  reference: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: string
  items: CartItem[]
  customer: {
    name: string
    email: string
    phone: string
  }
  shipping: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  subtotal: number
  shipping: number
  tax: number
  total: number
  estimatedDelivery?: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  inventory: number
  discount?: number
}

// In-memory database
const orders: Order[] = []
const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 129.99,
    image: "/products/minimalist-watch.png",
    category: "Accessories",
    inventory: 50,
  },
  {
    id: "2",
    name: "Leather Backpack",
    price: 89.99,
    image: "/products/leather-backpack.png",
    category: "Bags",
    inventory: 35,
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    price: 149.99,
    image: "/products/wireless-earbuds.png",
    category: "Electronics",
    inventory: 20,
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "/products/cotton-tshirt.png",
    category: "Clothing",
    inventory: 100,
  },
  {
    id: "101",
    name: "Canvas Backpack",
    price: 79.99,
    image: "/products/canvas-backpack.png",
    category: "Bags",
    inventory: 25,
  },
  {
    id: "102",
    name: "Travel Duffel Bag",
    price: 89.99,
    image: "/products/travel-duffel.png",
    category: "Bags",
    discount: 15,
    inventory: 15,
  },
]

// Order functions
export async function createOrder(orderData: Omit<Order, "id">): Promise<Order> {
  const id = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const order = { ...orderData, id }
  orders.push(order)
  return order
}

export async function getOrderByReference(reference: string): Promise<Order | null> {
  return orders.find((order) => order.reference === reference) || null
}

export async function getOrderById(id: string): Promise<Order | null> {
  return orders.find((order) => order.id === id) || null
}

export async function getOrdersByCustomerEmail(email: string): Promise<Order[]> {
  return orders.filter((order) => order.customer.email === email)
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<Order | null> {
  const orderIndex = orders.findIndex((order) => order.id === id)
  if (orderIndex === -1) return null

  orders[orderIndex].status = status
  return orders[orderIndex]
}

// Product functions
export async function getProductById(id: string): Promise<Product | null> {
  return products.find((product) => product.id === id) || null
}

export async function updateProductInventory(id: string, quantity: number): Promise<Product | null> {
  const productIndex = products.findIndex((product) => product.id === id)
  if (productIndex === -1) return null

  products[productIndex].inventory -= quantity
  return products[productIndex]
}

export async function getAllProducts(): Promise<Product[]> {
  return products
}

