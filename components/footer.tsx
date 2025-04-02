import Link from "next/link"
import AIChatbot from "@/components/ai-chatbot"

export default function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:py-12">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">ACME</h3>
          <p className="text-sm text-muted-foreground">Quality products for your lifestyle.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-medium">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products" className="text-sm text-muted-foreground hover:underline">
                All Products
              </Link>
              <Link href="/products" className="text-sm text-muted-foreground hover:underline">
                New Arrivals
              </Link>
              <Link href="/products" className="text-sm text-muted-foreground hover:underline">
                Featured
              </Link>
              <Link href="/sale" className="text-sm text-muted-foreground hover:underline">
                Sale
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-medium">Categories</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/categories" className="text-sm text-muted-foreground hover:underline">
                Clothing
              </Link>
              <Link href="/categories" className="text-sm text-muted-foreground hover:underline">
                Accessories
              </Link>
              <Link href="/categories" className="text-sm text-muted-foreground hover:underline">
                Electronics
              </Link>
              <Link href="/categories" className="text-sm text-muted-foreground hover:underline">
                Home
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-medium">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:underline">
                About Us
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:underline">
                Careers
              </Link>
              <Link href="/press" className="text-sm text-muted-foreground hover:underline">
                Press
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-medium">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Help Center
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Shipping
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Returns
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                FAQ
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 ACME Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                className="h-5 w-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        <AIChatbot />
      </div>
    </footer>
  )
}

