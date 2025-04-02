import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import FeaturedCategories from "@/components/featured-categories"
import NewsletterSignup from "@/components/newsletter-signup"
import SpecialOffers from "@/components/special-offers"
import BrandShowcase from "@/components/brand-showcase"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-36">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Discover Quality Products for Your Lifestyle
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Shop our curated collection of premium products designed to enhance your everyday life.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button size="lg">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/categories">
                    <Button variant="outline" size="lg">
                      Browse Categories
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/hero-image.png"
                  alt="Hero Image"
                  className="aspect-square overflow-hidden rounded-xl object-cover"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>

        <BrandShowcase />

        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our most popular items, hand-picked for quality and style.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <ProductCard
                id="1"
                name="Minimalist Watch"
                price={129.99}
                image="/products/minimalist-watch.png"
                category="Accessories"
              />
              <ProductCard
                id="2"
                name="Leather Backpack"
                price={89.99}
                image="/products/leather-backpack.png"
                category="Bags"
              />
              <ProductCard
                id="3"
                name="Wireless Earbuds"
                price={149.99}
                image="/products/wireless-earbuds.png"
                category="Electronics"
              />
              <ProductCard
                id="4"
                name="Cotton T-Shirt"
                price={29.99}
                image="/products/cotton-tshirt.png"
                category="Clothing"
              />
            </div>
            <div className="flex justify-center">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <SpecialOffers />

        <FeaturedCategories />

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Us</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We're committed to providing the best shopping experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Free Shipping</h3>
                <p className="text-muted-foreground">On all orders over $50</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure Payments</h3>
                <p className="text-muted-foreground">100% secure payment</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Easy Returns</h3>
                <p className="text-muted-foreground">30 day return policy</p>
              </div>
            </div>
          </div>
        </section>

        <NewsletterSignup />
      </main>
    </div>
  )
}

