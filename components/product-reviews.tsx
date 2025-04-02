import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  // In a real app, you would fetch reviews based on the product ID
  const reviews = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/avatars/user-1.png",
        initials: "AJ",
      },
      rating: 5,
      date: "2 weeks ago",
      title: "Excellent quality and design",
      content:
        "I've been using this backpack for two weeks now and I'm extremely impressed with the quality. The leather is soft yet durable, and the stitching is impeccable. It has plenty of room for all my daily essentials, including my laptop, tablet, and books. The straps are comfortable even when the bag is fully loaded. Highly recommend!",
    },
    {
      id: "2",
      user: {
        name: "Sarah Miller",
        avatar: "/avatars/user-2.png",
        initials: "SM",
      },
      rating: 4,
      date: "1 month ago",
      title: "Great backpack with minor issues",
      content:
        "This backpack is almost perfect. The quality is excellent and it looks very stylish. I love the multiple compartments which help me stay organized. The only issue I've encountered is that the zippers can be a bit stiff at first. They seem to be loosening up with use though. Overall, I'm very happy with my purchase.",
    },
    {
      id: "3",
      user: {
        name: "Michael Chen",
        avatar: "/avatars/user-3.png",
        initials: "MC",
      },
      rating: 5,
      date: "3 months ago",
      title: "Perfect for daily commute",
      content:
        "I use this backpack for my daily commute to work and it's perfect. It fits my 15\" laptop, lunch, and other essentials with room to spare. The leather quality is exceptional and it's already developing a nice patina. The padded straps make it comfortable to carry even when it's heavy. Definitely worth the investment!",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Customer Reviews ({reviews.length})</h3>
        <Button>Write a Review</Button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.user.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium">{review.title}</h4>
              <p className="text-sm text-muted-foreground">{review.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}

