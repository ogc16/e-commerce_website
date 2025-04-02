import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function SitemapPage() {
  const siteStructure = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/categories" },
        { name: "Sale", path: "/sale" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Featured", path: "/featured" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Product Categories",
      links: [
        { name: "Clothing", path: "/categories/clothing" },
        { name: "Electronics", path: "/categories/electronics" },
        { name: "Accessories", path: "/categories/accessories" },
        { name: "Home & Living", path: "/categories/home" },
        { name: "Bags", path: "/categories/bags" },
      ],
    },
    {
      title: "User Account",
      links: [
        { name: "Sign In", path: "/sign-in" },
        { name: "Sign Up", path: "/sign-up" },
        { name: "Profile", path: "/account/profile" },
        { name: "Order History", path: "/account/orders" },
        { name: "Addresses", path: "/account/addresses" },
        { name: "Payment Methods", path: "/account/payment" },
      ],
    },
    {
      title: "Shopping",
      links: [
        { name: "Cart", path: "/cart" },
        { name: "Checkout", path: "/checkout" },
        { name: "Order Confirmation", path: "/order-confirmation" },
        { name: "Image Search", path: "/image-search" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { name: "Help Center", path: "/help-center" },
        { name: "Shipping Information", path: "/shipping" },
        { name: "Returns Policy", path: "/returns" },
        { name: "FAQ", path: "/faq" },
        { name: "Documentation", path: "/docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
      ],
    },
    {
      title: "Admin",
      links: [
        { name: "Dashboard", path: "/admin" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Inventory", path: "/admin/inventory" },
        { name: "Images", path: "/admin/images" },
        { name: "Settings", path: "/admin/settings" },
      ],
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Site Navigation</h1>
        <p className="text-muted-foreground">A complete map of our website structure</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {siteStructure.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-3">
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>
                {section.links.length} page{section.links.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="flex items-center justify-between rounded-md p-2 hover:bg-muted">
                      <span>{link.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                    <Separator className="mt-2" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Website Flow Diagram</h2>
        <div className="rounded-lg border p-6 bg-muted/50">
          <div className="flex justify-center">
            <div className="max-w-3xl w-full">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md mb-4">Home Page</div>
                <div className="grid grid-cols-4 gap-4 w-full mb-4">
                  <div className="bg-card border px-3 py-2 rounded-md text-center text-sm">Products</div>
                  <div className="bg-card border px-3 py-2 rounded-md text-center text-sm">Categories</div>
                  <div className="bg-card border px-3 py-2 rounded-md text-center text-sm">Sale</div>
                  <div className="bg-card border px-3 py-2 rounded-md text-center text-sm">About</div>
                </div>
                <div className="flex justify-center gap-8 mb-4 w-full">
                  <div className="flex flex-col items-center">
                    <div className="bg-card border px-3 py-2 rounded-md text-center text-sm mb-2">Product Details</div>
                    <div className="h-8 border-l-2 border-dashed"></div>
                    <div className="bg-card border px-3 py-2 rounded-md text-center text-sm">Add to Cart</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-card border px-3 py-2 rounded-md text-center text-sm mb-2">Category Page</div>
                    <div className="h-8 border-l-2 border-dashed"></div>
                    <div className="bg-card border px-3 py-2 rounded-md text-center text-sm">Filter Products</div>
                  </div>
                </div>
                <div className="h-8 border-l-2 border-dashed"></div>
                <div className="bg-card border px-3 py-2 rounded-md text-center text-sm mb-4">Shopping Cart</div>
                <div className="h-8 border-l-2 border-dashed"></div>
                <div className="bg-card border px-3 py-2 rounded-md text-center text-sm mb-4">Checkout</div>
                <div className="h-8 border-l-2 border-dashed"></div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Order Confirmation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

