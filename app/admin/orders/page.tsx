"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Order } from "@/lib/db"

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a response
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock orders data
        const ordersData: Order[] = [
          {
            id: "ORD-1234",
            reference: "REF-1234",
            date: new Date().toISOString(),
            status: "processing",
            paymentStatus: "paid",
            paymentMethod: "Paystack",
            items: [
              {
                id: "1",
                name: "Premium Leather Backpack",
                price: 129.99,
                image: "/products/premium-backpack-1.png",
                quantity: 1,
              },
              {
                id: "3",
                name: "Wireless Earbuds",
                price: 149.99,
                image: "/products/wireless-earbuds.png",
                quantity: 1,
              },
            ],
            customer: {
              name: "Alex Johnson",
              email: "alex@example.com",
              phone: "+1 (555) 123-4567",
            },
            shipping: {
              address: "123 Main Street",
              city: "Lagos",
              state: "Lagos State",
              zipCode: "100001",
              country: "Nigeria",
            },
            subtotal: 279.98,
            shipping: 10.0,
            tax: 14.0,
            total: 303.98,
          },
          {
            id: "ORD-5678",
            reference: "REF-5678",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: "shipped",
            paymentStatus: "paid",
            paymentMethod: "Paystack",
            items: [
              {
                id: "2",
                name: "Leather Backpack",
                price: 89.99,
                image: "/products/leather-backpack.png",
                quantity: 1,
              },
            ],
            customer: {
              name: "Sarah Miller",
              email: "sarah@example.com",
              phone: "+1 (555) 987-6543",
            },
            shipping: {
              address: "456 Oak Avenue",
              city: "Lagos",
              state: "Lagos State",
              zipCode: "100002",
              country: "Nigeria",
            },
            subtotal: 89.99,
            shipping: 10.0,
            tax: 4.5,
            total: 104.49,
          },
          {
            id: "ORD-9012",
            reference: "REF-9012",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: "delivered",
            paymentStatus: "paid",
            paymentMethod: "Paystack",
            items: [
              {
                id: "4",
                name: "Cotton T-Shirt",
                price: 29.99,
                image: "/products/cotton-tshirt.png",
                quantity: 2,
              },
              {
                id: "101",
                name: "Canvas Backpack",
                price: 79.99,
                image: "/products/canvas-backpack.png",
                quantity: 1,
              },
            ],
            customer: {
              name: "Michael Chen",
              email: "michael@example.com",
              phone: "+1 (555) 456-7890",
            },
            shipping: {
              address: "789 Pine Street",
              city: "Lagos",
              state: "Lagos State",
              zipCode: "100003",
              country: "Nigeria",
            },
            subtotal: 139.97,
            shipping: 10.0,
            tax: 7.0,
            total: 156.97,
          },
        ]

        setOrders(ordersData)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Filter and search orders
  const filteredOrders = orders.filter((order) => {
    // Apply status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Update order status
  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll update the local state
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders by ID, customer name, or email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div>
                      <p>{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
                      >
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No orders found</p>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Orders will appear here once customers make purchases"}
          </p>
        </div>
      )}
    </div>
  )
}

