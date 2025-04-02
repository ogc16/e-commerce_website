import { ShoppingBag } from "lucide-react"

interface FallbackSuggestionProps {
  categories?: string[]
  priceRange?: [number, number]
}

export default function FallbackSuggestion({ categories, priceRange }: FallbackSuggestionProps) {
  // Generate a contextual suggestion based on the filters
  const getSuggestion = () => {
    if (categories && categories.length > 0) {
      if (categories.includes("bags")) {
        return "Explore our premium bag collection - stylish, durable, and perfect for everyday use!"
      } else if (categories.includes("electronics")) {
        return "Check out our latest tech gadgets with cutting-edge features and sleek designs!"
      } else if (categories.includes("clothing")) {
        return "Discover our fashion essentials - comfortable, trendy, and perfect for any occasion!"
      } else if (categories.includes("accessories")) {
        return "Browse our accessories collection to add the perfect finishing touch to any outfit!"
      }
    }

    // Price-based suggestions
    if (priceRange) {
      if (priceRange[1] < 50) {
        return "Great deals under $50! Quality products that won't break the bank."
      } else if (priceRange[0] > 100) {
        return "Explore our premium collection - luxury items worth the investment!"
      }
    }

    // Default suggestion
    return "Check out our latest arrivals, handpicked for quality and style!"
  }

  return (
    <div className="mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
      <div className="flex items-start gap-3">
        <div className="bg-primary text-primary-foreground p-2 rounded-full">
          <ShoppingBag className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-medium text-sm">Shopping Assistant</h3>
          <p className="text-sm text-muted-foreground">{getSuggestion()}</p>
        </div>
      </div>
    </div>
  )
}

