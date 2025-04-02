"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Plus, Edit, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { type Product, getAllProducts } from "@/lib/db"

export default function InventoryAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const productsData = await getAllProducts()
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Filter and search products
  const filteredProducts = products.filter((product) => {
    // Apply category filter
    if (categoryFilter !== "all" && product.category !== categoryFilter) {
      return false
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Update inventory
  const handleInventoryChange = async (productId: string, newInventory: number) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll update the local state
      setProducts(
        products.map((product) => (product.id === productId ? { ...product, inventory: newInventory } : product)),
      )
    } catch (error) {
      console.error("Error updating inventory:", error)
    }
  }

  // Get inventory status
  const getInventoryStatus = (inventory: number) => {
    if (inventory <= 0) {
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
    } else if (inventory < 10) {
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    } else {
      return { label: "In Stock", color: "bg-green-100 text-green-800" }
    }
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manage product inventory and stock levels</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/admin/inventory/add">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products by name, ID, or category..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
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
      ) : filteredProducts.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const inventoryStatus = getInventoryStatus(product.inventory)

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={product.inventory}
                        onChange={(e) => handleInventoryChange(product.id, Number.parseInt(e.target.value))}
                        className="w-20 h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Badge className={inventoryStatus.color}>{inventoryStatus.label}</Badge>
                      {product.inventory < 10 && product.inventory > 0 && (
                        <div className="flex items-center text-yellow-600 text-xs mt-1">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Low stock
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/inventory/edit/${product.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/products/${product.id}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-muted-foreground">
            {searchQuery || categoryFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Add products to manage your inventory"}
          </p>
          <Link href="/admin/inventory/add" className="mt-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

