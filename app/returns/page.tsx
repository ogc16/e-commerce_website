import Link from "next/link"
import { ArrowLeft, RefreshCcw, Clock, CheckCircle, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Steps, StepItem } from "@/components/steps"
import AIChatbot from "@/components/ai-chatbot"

export default function ReturnsPage() {
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
        <h1 className="text-3xl font-bold">Returns & Refunds</h1>
        <p className="text-muted-foreground">Our hassle-free return policy and process</p>
      </div>

      <Tabs defaultValue="policy" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="policy">Return Policy</TabsTrigger>
          <TabsTrigger value="process">Return Process</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="policy" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Our 30-Day Return Policy</h2>
              <p className="mb-4">
                We want you to be completely satisfied with your purchase. If you're not, you can return most items
                within 30 days of delivery for a full refund or exchange.
              </p>

              <div className="rounded-lg border p-4 bg-muted/50 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-500" />
                  <div>
                    <p className="font-medium">Eligible for Return</p>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                      <li>Unworn, unwashed, and undamaged items</li>
                      <li>Items with original tags and packaging</li>
                      <li>Items purchased within the last 30 days</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5 text-red-500" />
                  <div>
                    <p className="font-medium">Not Eligible for Return</p>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                      <li>Personalized or custom-made items</li>
                      <li>Intimate apparel and swimwear (for hygiene reasons)</li>
                      <li>Digital products and gift cards</li>
                      <li>Items marked as final sale</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Refund Information</h2>
              <p className="mb-4">
                Refunds will be issued to the original payment method used for the purchase. Please allow 5-10 business
                days for the refund to appear in your account after we've received and processed your return.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Original Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Refunds are issued to the original payment method used for the purchase.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Processing Time</h3>
                    <p className="text-sm text-muted-foreground">
                      Refunds typically take 5-10 business days to process after we receive your return.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Return Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Return shipping costs are the responsibility of the customer unless the item is defective.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="process" className="mt-6">
          <h2 className="text-xl font-bold mb-6">How to Return an Item</h2>

          <Steps className="mb-8">
            <StepItem title="Start Your Return" icon={<RefreshCcw className="h-5 w-5" />}>
              <p className="text-muted-foreground">
                Log in to your account and go to "Order History." Find the order containing the item you want to return
                and click "Return Items."
              </p>
            </StepItem>

            <StepItem title="Select Items & Reason" icon={<CheckCircle className="h-5 w-5" />}>
              <p className="text-muted-foreground">
                Select the items you wish to return and provide a reason for the return. This helps us improve our
                products and services.
              </p>
            </StepItem>

            <StepItem title="Print Return Label" icon={<Clock className="h-5 w-5" />}>
              <p className="text-muted-foreground">
                Print the return shipping label. If you don't have a printer, you can also request to have a return
                label emailed to you.
              </p>
            </StepItem>

            <StepItem title="Package Your Return" icon={<Clock className="h-5 w-5" />}>
              <p className="text-muted-foreground">
                Pack the items securely in the original packaging if possible. Include all tags, accessories, and
                documentation that came with the item.
              </p>
            </StepItem>

            <StepItem title="Ship Your Return" icon={<Clock className="h-5 w-5" />}>
              <p className="text-muted-foreground">
                Drop off your package at any authorized shipping location. Keep your tracking number to monitor the
                return status.
              </p>
            </StepItem>

            <StepItem title="Receive Your Refund" icon={<CheckCircle className="h-5 w-5" />}>
              <p className="text-muted-foreground">
                Once we receive and process your return, we'll issue a refund to your original payment method within
                5-10 business days.
              </p>
            </StepItem>
          </Steps>

          <div className="rounded-lg border p-6 bg-muted/50">
            <h3 className="font-medium mb-2">Need Help with Your Return?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our customer service team is here to assist you with any questions or issues regarding your return.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Customer Service</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">How long do I have to return an item?</h3>
              <p className="text-muted-foreground">
                You have 30 days from the delivery date to initiate a return. Returns initiated after this period may
                not be accepted.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Can I exchange an item instead of returning it?</h3>
              <p className="text-muted-foreground">
                Yes, you can exchange items for a different size, color, or style. Simply select "Exchange" instead of
                "Return" when initiating the process in your account.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Do I have to pay for return shipping?</h3>
              <p className="text-muted-foreground">
                Yes, customers are responsible for return shipping costs unless the item is defective or we made an
                error in your order. Return shipping fees will be deducted from your refund amount.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">What if I received a defective item?</h3>
              <p className="text-muted-foreground">
                If you received a defective item, please contact our customer service team immediately. We'll provide a
                prepaid return label and process a replacement or refund as soon as possible.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Can I return a gift?</h3>
              <p className="text-muted-foreground">
                Yes, gifts can be returned. You'll need the order number and the email address used to place the order.
                The refund will be issued as a store credit to the gift recipient.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">How will I know when my refund has been processed?</h3>
              <p className="text-muted-foreground">
                You'll receive an email notification when your return is received and another when your refund is
                processed. You can also check the status in your account under "Order History."
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <AIChatbot />
    </div>
  )
}

