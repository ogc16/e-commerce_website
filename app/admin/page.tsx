import Link from "next/link"
import { Package, ShoppingBag, Users, CreditCard, BarChart3, Settings, Truck, Tag, Image } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductDescriptionGenerator from "./product-description-generator"
import EmailTester from "./email-tester"

export default function AdminPage() {
  const adminModules = [
    {
      title: "Orders",
      description: "Manage customer orders",
      icon: <Package className="h-5 w-5" />,
      href: "/admin/orders",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Inventory",
      description: "Manage product inventory",
      icon: <ShoppingBag className="h-5 w-5" />,
      href: "/admin/inventory",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Customers",
      description: "View and manage customers",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/customers",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Payments",
      description: "View payment transactions",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/admin/payments",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Analytics",
      description: "View sales and performance",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/analytics",
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Settings",
      description: "Configure store settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
      color: "bg-gray-100 text-gray-700",
    },
    {
      title: "Shipping",
      description: "Manage shipping options",
      icon: <Truck className="h-5 w-5" />,
      href: "/admin/shipping",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      title: "Discounts",
      description: "Create and manage discounts",
      icon: <Tag className="h-5 w-5" />,
      href: "/admin/discounts",
      color: "bg-pink-100 text-pink-700",
    },
    {
      title: "Images",
      description: "Manage product images",
      icon: <Image className="h-5 w-5" />,
      href: "/admin/images",
      color: "bg-orange-100 text-orange-700",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {adminModules.map((module) => (
          <Link key={module.title} href={module.href}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className={`w-10 h-10 rounded-full ${module.color} flex items-center justify-center mb-2`}>
                  {module.icon}
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">AI Product Description Generator</h2>
          <ProductDescriptionGenerator />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Email System</h2>
          <EmailTester />
        </div>
      </div>
    </div>
  )
}

