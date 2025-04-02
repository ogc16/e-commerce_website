"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Search, Camera } from "lucide-react"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MainNav from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCartCount } from "@/lib/cart-utils"

export default function TopNavbar() {
  const { isSignedIn, user } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MainNav className="flex-col items-start" />
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <img src="/logo.svg" alt="ACME Logo" className="h-6 w-6" />
          <span className="font-bold inline-block">ACME</span>
        </Link>
        <div className="hidden md:flex">
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <Link href="/image-search">
            <Button variant="ghost" size="icon" title="Visual Search">
              <Camera className="h-5 w-5" />
              <span className="sr-only">Visual Search</span>
            </Button>
          </Link>
          <ThemeToggle />

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex items-center space-x-1">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </div>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {getCartCount()}
              </span>
            </Button>
          </Link>
          <Link href="/admin" className="hidden md:block">
            <Button variant="outline" size="sm">
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

