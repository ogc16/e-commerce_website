import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  discount?: number
}

export default function ProductCard({ id, name, price, image, category, discount }: ProductCardProps) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {discount && <Badge className="absolute right-2 top-2 bg-red-500 hover:bg-red-600">{discount}% OFF</Badge>}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{category}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center gap-2">
          {discount ? (
            <>
              <span className="font-bold">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${price.toFixed(2)}</span>
          )}
        </div>
        <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

