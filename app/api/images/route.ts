import { NextResponse } from "next/server"

// This is a simple API route to list available images
export async function GET() {
  const images = {
    products: [
      { id: "p1", name: "Modern Watch", path: "/images/products/watch.jpg" },
      { id: "p2", name: "Leather Backpack", path: "/images/products/backpack.jpg" },
      { id: "p3", name: "Wireless Earbuds", path: "/images/products/earbuds.jpg" },
      { id: "p4", name: "Cotton T-Shirt", path: "/images/products/tshirt.jpg" },
      { id: "p5", name: "Canvas Backpack", path: "/images/products/canvas-backpack.jpg" },
      { id: "p6", name: "Travel Duffel", path: "/images/products/travel-duffel.jpg" },
      { id: "p7", name: "Messenger Bag", path: "/images/products/messenger-bag.jpg" },
      { id: "p8", name: "Laptop Sleeve", path: "/images/products/laptop-sleeve.jpg" },
    ],
    categories: [
      { id: "c1", name: "Clothing", path: "/images/categories/clothing.jpg" },
      { id: "c2", name: "Electronics", path: "/images/categories/electronics.jpg" },
      { id: "c3", name: "Accessories", path: "/images/categories/accessories.jpg" },
      { id: "c4", name: "Home & Living", path: "/images/categories/home-living.jpg" },
    ],
    banners: [
      { id: "b1", name: "Hero Banner", path: "/images/banners/hero-banner.jpg" },
      { id: "b2", name: "Sale Banner", path: "/images/banners/sale-banner.jpg" },
    ],
  }

  return NextResponse.json(images)
}

