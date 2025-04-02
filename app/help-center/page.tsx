import Link from "next/link"
import { Search, FileText, MessageCircle, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AIChatbot from "@/components/ai-chatbot"

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Order History' section. There, you'll find tracking information for all your recent orders. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Some items like personalized products or intimate apparel may not be eligible for return due to hygiene reasons.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is available for 1-2 business day delivery. International shipping times vary by location, generally taking 7-14 business days.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customers are responsible for any customs fees or import taxes that may apply.",
    },
    {
      question: "How can I change or cancel my order?",
      answer:
        "You can request changes or cancellation by contacting our customer service team within 1 hour of placing your order. After this window, orders are processed for shipping and cannot be modified or canceled.",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions and get the support you need
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for help..." className="pl-10 py-6 text-lg" />
        </div>
      </div>

      <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Learn about our shipping options and delivery times</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We offer multiple shipping options to meet your needs, from standard to express delivery.
                </p>
                <Button variant="outline" className="w-full">
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Returns & Exchanges</CardTitle>
                <CardDescription>How to return or exchange your purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our hassle-free return process makes it easy to return or exchange items.
                </p>
                <Button variant="outline" className="w-full">
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Information about accepted payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We accept various payment methods including credit cards, PayPal, and more.
                </p>
                <Button variant="outline" className="w-full">
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>How to manage your account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to update your profile, manage addresses, and track orders.
                </p>
                <Button variant="outline" className="w-full">
                  Read Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Available Monday-Friday, 9am-5pm EST</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send us an email</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">We typically respond within 24 hours</p>
                <Button variant="outline" className="w-full">
                  <Link href="/contact">Contact Form</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Submit a Ticket</CardTitle>
                <CardDescription>Create a support ticket</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">For complex issues requiring detailed assistance</p>
                <Button variant="outline" className="w-full">
                  Create Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AIChatbot />
    </div>
  )
}

