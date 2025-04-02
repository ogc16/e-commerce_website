import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import TopNavbar from "@/components/top-navbar"
import Footer from "@/components/footer"
// Import the ClerkProvider
import { ClerkProvider } from "@/components/clerk-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ACME - Modern Ecommerce",
  description: "A modern ecommerce website with AI-powered features",
    generator: 'v0.dev'
}

// Update the RootLayout function to include ClerkProvider
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              <TopNavbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}



import './globals.css'