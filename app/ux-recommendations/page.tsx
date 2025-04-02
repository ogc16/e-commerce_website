import { ArrowRight, Check, AlertTriangle, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function UXRecommendationsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">UX Recommendations</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis and recommendations to enhance the user experience of your e-commerce platform
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="product">Product Experience</TabsTrigger>
          <TabsTrigger value="checkout">Checkout Process</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Experience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>What's working well in the current implementation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Clean, modern design</p>
                    <p className="text-sm text-muted-foreground">
                      The interface uses a clean, minimalist design that focuses on content and products.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">AI integration</p>
                    <p className="text-sm text-muted-foreground">
                      The AI chatbot and product recommendations provide personalized assistance.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Comprehensive product information</p>
                    <p className="text-sm text-muted-foreground">
                      Product pages include detailed information, specifications, and reviews.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Dark/light mode support</p>
                    <p className="text-sm text-muted-foreground">
                      The theme toggle enhances accessibility and user preference.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Innovative features</p>
                    <p className="text-sm text-muted-foreground">
                      Visual search and AI-powered recommendations set the platform apart.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Key opportunities to enhance the user experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Mobile optimization</p>
                    <p className="text-sm text-muted-foreground">
                      Some components could be further optimized for smaller screens.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Checkout simplification</p>
                    <p className="text-sm text-muted-foreground">
                      The checkout process has multiple steps that could be streamlined.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Performance optimization</p>
                    <p className="text-sm text-muted-foreground">
                      Image loading and API calls could be optimized for faster performance.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Accessibility enhancements</p>
                    <p className="text-sm text-muted-foreground">
                      Some elements need improved accessibility for screen readers and keyboard navigation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">User onboarding</p>
                    <p className="text-sm text-muted-foreground">
                      New users could benefit from guided onboarding to discover key features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Priority Recommendations</h2>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full">1</div>
                  <div>
                    <h3 className="font-medium">Implement one-page checkout</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consolidate the checkout process into a single page with collapsible sections to reduce friction
                      and cart abandonment. Research shows this can increase conversion rates by up to 20%.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full">2</div>
                  <div>
                    <h3 className="font-medium">Add product quick-view functionality</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implement a quick-view modal that appears when hovering over products in listing pages, allowing
                      users to view key details and add to cart without navigating to the product page.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full">3</div>
                  <div>
                    <h3 className="font-medium">Enhance mobile navigation</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Optimize the mobile menu with larger touch targets, simplified categories, and a persistent bottom
                      navigation bar for key actions like search, cart, and account.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full">4</div>
                  <div>
                    <h3 className="font-medium">Implement lazy loading and image optimization</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Optimize performance by implementing lazy loading for images and content below the fold, and use
                      next-gen image formats (WebP) with proper sizing and compression.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-full">5</div>
                  <div>
                    <h3 className="font-medium">Add personalized homepage sections</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create dynamic, personalized sections on the homepage based on user browsing history, previous
                      purchases, and AI recommendations to increase engagement and conversion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="navigation">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Analysis</CardTitle>
              <CardDescription>Evaluation of the current navigation structure and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Structure</h3>
                <p className="text-muted-foreground mb-4">
                  The current navigation includes a top navbar with main categories, search, cart, and user account
                  access. Mobile navigation is provided through a hamburger menu.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Strengths</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Clean, uncluttered top navigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Prominent search functionality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Logical categorization of products</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Visual search option for innovative discovery</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Mobile menu requires optimization for easier navigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Mega menu for categories would improve discoverability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Recently viewed items not easily accessible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Breadcrumbs inconsistently implemented across pages</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Implement mega menu for categories</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Replace the simple dropdown with a comprehensive mega menu that displays subcategories,
                          featured products, and promotions when hovering over main categories.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add sticky navigation on mobile</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement a persistent bottom navigation bar on mobile with icons for home, search,
                          categories, cart, and account to improve mobile usability.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add consistent breadcrumbs</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement breadcrumb navigation on all product, category, and content pages to help users
                          understand their location and navigate back to previous levels.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add "Recently Viewed" section</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement a persistent "Recently Viewed" section that appears on product pages and in the
                          sidebar to help users return to products they've shown interest in.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Enhance search with autocomplete and filters</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Improve the search functionality with autocomplete suggestions, popular searches, and the
                          ability to filter results directly from the search dropdown.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product">
          <Card>
            <CardHeader>
              <CardTitle>Product Experience Analysis</CardTitle>
              <CardDescription>Evaluation of product discovery, presentation, and interaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Implementation</h3>
                <p className="text-muted-foreground mb-4">
                  The product experience includes product cards, detailed product pages, filtering and sorting options,
                  and AI-powered recommendations.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Strengths</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Clean product cards with essential information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Detailed product pages with specifications and reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>AI-powered product recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Effective filtering and sorting options</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>No quick-view functionality for products</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Limited product comparison capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Wishlist functionality not prominently featured</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Product images could benefit from zoom functionality</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Implement product quick-view</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add a quick-view modal that appears when users hover over or click a quick-view button on
                          product cards, showing key details and allowing add-to-cart without page navigation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add product comparison feature</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement a product comparison tool that allows users to select multiple products and compare
                          their specifications, features, and prices side-by-side.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Enhance product images</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement image zoom functionality, 360-degree product views, and video previews for products
                          to provide a more comprehensive visual experience.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Improve wishlist functionality</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add prominent wishlist buttons on product cards and detail pages, implement wishlist
                          notifications, and allow users to organize wishlist items into collections for different
                          purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add social proof elements</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Incorporate real-time social proof elements such as "X people are viewing this product," "Y
                          purchased in the last 24 hours," and "Recently sold in [location]" to build trust and urgency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkout">
          <Card>
            <CardHeader>
              <CardTitle>Checkout Process Analysis</CardTitle>
              <CardDescription>Evaluation of the cart and checkout experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Implementation</h3>
                <p className="text-muted-foreground mb-4">
                  The checkout process includes a cart page, multi-step checkout flow, and integration with Paystack for
                  payment processing.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Strengths</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Clear cart summary with product details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Secure payment processing with Paystack</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Guest checkout option available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Order summary visible throughout checkout</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Multi-step checkout creates friction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Limited payment options available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>No express checkout options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Cart abandonment recovery not implemented</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Implement one-page checkout</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Consolidate the checkout process into a single page with collapsible sections for shipping,
                          billing, and payment to reduce friction and cart abandonment.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add express checkout options</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement express checkout buttons for Apple Pay, Google Pay, and Shop Pay to allow users to
                          complete purchases with minimal steps.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Implement cart abandonment recovery</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add email capture early in the checkout process and implement automated cart abandonment
                          emails with personalized incentives to recover lost sales.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add real-time order tracking</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement a comprehensive order tracking system that provides real-time updates on order
                          status, shipping, and delivery through both the website and email notifications.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Enhance address validation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement real-time address validation and auto-completion to reduce errors and improve the
                          shipping information entry experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Experience Analysis</CardTitle>
              <CardDescription>Evaluation of the mobile responsiveness and usability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Implementation</h3>
                <p className="text-muted-foreground mb-4">
                  The website is responsive and adapts to mobile devices with a hamburger menu for navigation and
                  optimized layouts for smaller screens.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Strengths</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Responsive design adapts to different screen sizes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Mobile-friendly product cards and layouts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Simplified navigation with hamburger menu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-1" />
                        <span>Touch-friendly UI elements</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>No persistent bottom navigation on mobile</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Mobile filters require optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Touch targets could be larger in some areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                        <span>Mobile checkout experience needs streamlining</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add persistent bottom navigation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement a fixed bottom navigation bar on mobile with icons for home, search, categories,
                          cart, and account to improve mobile usability and access to key functions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optimize mobile filters</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Redesign the mobile filtering experience with a slide-up panel, larger touch targets, and the
                          ability to apply multiple filters simultaneously without closing the panel.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Implement mobile-specific gestures</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add swipe gestures for common actions like adding to cart, navigating product images, and
                          moving between related products to enhance the mobile experience.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optimize images for mobile</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement responsive images with different sizes for mobile devices to improve loading times
                          and reduce data usage, particularly important for mobile users on limited data plans.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Info className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add mobile app-like features</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implement progressive web app (PWA) functionality to allow users to install the website as an
                          app on their home screen, with offline capabilities and push notifications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Ready to implement these recommendations and enhance your e-commerce platform? Our team can help prioritize
          and execute these improvements.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="gap-2">
            Request Implementation Plan
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </div>
  )
}

