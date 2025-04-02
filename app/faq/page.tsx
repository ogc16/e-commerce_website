import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AIChatbot from "@/components/ai-chatbot"

export default function FAQPage() {
  const generalFaqs = [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the user icon in the top right corner of the page and selecting 'Sign Up'. Fill in your details, and you're all set!",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. We use industry-standard encryption and never share your personal information with third parties without your consent.",
    },
    {
      question: "Do you have a loyalty program?",
      answer:
        "Yes, our ACME Rewards program lets you earn points on every purchase. These points can be redeemed for discounts on future orders.",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "You can reach our customer service team through the Contact page, by email at support@acme.com, or by phone at (555) 123-4567 during business hours.",
    },
  ]

  const orderFaqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Order History' section. There, you'll find tracking information for all your recent orders.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed.",
    },
    {
      question: "What if an item in my order is out of stock?",
      answer:
        "If an item in your order is out of stock, we'll notify you immediately and offer alternatives or a refund for that item.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping for a small additional fee. You can select this option during checkout.",
    },
    {
      question: "Can I order by phone?",
      answer: "Yes, you can place an order by calling our customer service at (555) 123-4567 during business hours.",
    },
  ]

  const shippingFaqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days. Express shipping is 1-2 business days. International shipping varies by location.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.",
    },
    {
      question: "Is shipping free?",
      answer: "We offer free standard shipping on all orders over $50 within the continental US.",
    },
    {
      question: "Can I ship to multiple addresses?",
      answer: "Yes, you can ship to multiple addresses by creating separate orders for each address.",
    },
    {
      question: "Do you ship to PO boxes?",
      answer:
        "Yes, we can ship to PO boxes using standard shipping methods. Express shipping is not available for PO boxes.",
    },
  ]

  const returnFaqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached.",
    },
    {
      question: "How do I return an item?",
      answer:
        "To return an item, log into your account, go to 'Order History', select the order, and click 'Return Items'. Follow the instructions to complete the return process.",
    },
    {
      question: "Who pays for return shipping?",
      answer: "Customers are responsible for return shipping costs unless the item is defective or we made an error.",
    },
    {
      question: "How long does it take to process a refund?",
      answer: "Refunds are typically processed within 5-10 business days after we receive your return.",
    },
    {
      question: "Can I exchange an item?",
      answer:
        "Yes, you can exchange items for a different size, color, or style. Select 'Exchange' instead of 'Return' when initiating the process.",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our products, ordering, shipping, and more
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for answers..." className="pl-10 py-6 text-lg" />
        </div>
      </div>

      <Tabs defaultValue="general" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {generalFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {orderFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {shippingFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="returns" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {returnFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-xl font-bold mb-4">Still Have Questions?</h2>
        <p className="mb-6 text-muted-foreground">
          Can't find the answer you're looking for? Please contact our customer support team.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
          <Link href="/help-center">
            <Button variant="outline">Visit Help Center</Button>
          </Link>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}

