import Link from "next/link"
import { Truck, Clock, Globe, CreditCard, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AIChatbot from "@/components/ai-chatbot"

export default function ShippingPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/help-center"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>
        <h1 className="text-3xl font-bold">Shipping Information</h1>
        <p className="text-muted-foreground">Everything you need to know about our shipping policies and options</p>
      </div>

      <Tabs defaultValue="options" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="options">Shipping Options</TabsTrigger>
          <TabsTrigger value="international">International Shipping</TabsTrigger>
          <TabsTrigger value="faq">Shipping FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="options" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Available Shipping Methods</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipping Method</TableHead>
                  <TableHead>Estimated Delivery</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Standard Shipping</TableCell>
                  <TableCell>3-5 business days</TableCell>
                  <TableCell>$5.99 (Free on orders over $50)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Express Shipping</TableCell>
                  <TableCell>1-2 business days</TableCell>
                  <TableCell>$12.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Next Day Delivery</TableCell>
                  <TableCell>Next business day (order by 2pm)</TableCell>
                  <TableCell>$19.99</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy free standard shipping on all orders over $50 within the continental US.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Processing Time</h3>
                <p className="text-sm text-muted-foreground">
                  Orders are typically processed within 1 business day before shipping.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Shipping Insurance</h3>
                <p className="text-sm text-muted-foreground">
                  Optional shipping insurance is available for 5% of your order value.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="international" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">International Shipping</h2>
            <p className="mb-4">
              We ship to most countries worldwide. International shipping rates and delivery times vary by location.
              Please note that customers are responsible for any customs fees, import duties, or taxes that may apply.
            </p>

            <div className="rounded-lg border p-4 bg-muted/50 mb-6">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">Countries We Ship To</p>
                  <p className="text-sm text-muted-foreground">
                    We currently ship to over 100 countries. If your country is not available at checkout, please
                    contact our customer service team for assistance.
                  </p>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Estimated Delivery</TableHead>
                  <TableHead>Starting Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Canada</TableCell>
                  <TableCell>5-7 business days</TableCell>
                  <TableCell>$14.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Europe</TableCell>
                  <TableCell>7-10 business days</TableCell>
                  <TableCell>$19.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Asia & Pacific</TableCell>
                  <TableCell>10-14 business days</TableCell>
                  <TableCell>$24.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rest of World</TableCell>
                  <TableCell>14-21 business days</TableCell>
                  <TableCell>$29.99</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How can I track my order?</h3>
              <p className="text-muted-foreground">
                Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also
                track your order by logging into your account and viewing your order history.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">What if my package is lost or damaged?</h3>
              <p className="text-muted-foreground">
                If your package is lost or arrives damaged, please contact our customer service team within 7 days of
                the expected delivery date. We'll work with the shipping carrier to resolve the issue.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Do you ship to PO boxes?</h3>
              <p className="text-muted-foreground">
                Yes, we can ship to PO boxes using standard shipping methods. However, express and next-day shipping
                options are not available for PO box addresses.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Can I change my shipping address after placing an order?</h3>
              <p className="text-muted-foreground">
                Address changes can only be accommodated if requested within 1 hour of placing your order. Please
                contact our customer service team immediately if you need to change your shipping address.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Do you offer expedited shipping for international orders?</h3>
              <p className="text-muted-foreground">
                Yes, expedited international shipping is available for most countries at an additional cost. The option
                will be displayed at checkout if available for your location.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-4">
            If you have any questions about shipping that aren't answered here, our customer service team is ready to
            help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline">
              <Link href="/help-center">Visit Help Center</Link>
            </Button>
          </div>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}

