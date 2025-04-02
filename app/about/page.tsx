import AIChatbot from "@/components/ai-chatbot"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About ACME</h1>
        <p className="text-muted-foreground">Learn about our story, mission, and values</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="space-y-4">
            <p>
              Founded in 2015, ACME began with a simple mission: to provide high-quality products that enhance everyday
              life. What started as a small online store has grown into a trusted destination for shoppers seeking
              premium goods across multiple categories.
            </p>
            <p>
              Our journey has been driven by a passion for exceptional craftsmanship and a commitment to customer
              satisfaction. We carefully curate each product in our collection, ensuring it meets our rigorous standards
              for quality, functionality, and design.
            </p>
            <p>
              Today, ACME serves customers worldwide, offering a diverse range of products from fashion accessories to
              home goods. Despite our growth, we remain dedicated to the principles that guided us from the beginning:
              quality, integrity, and customer-centricity.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Mission</h2>
          <p>
            At ACME, our mission is to enrich people's lives by providing thoughtfully designed, high-quality products
            that combine functionality, aesthetics, and sustainability. We strive to create a seamless shopping
            experience that inspires trust and loyalty.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Values</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                ✓
              </div>
              <div>
                <span className="font-medium">Quality Excellence</span> - We never compromise on the quality of our
                products.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                ✓
              </div>
              <div>
                <span className="font-medium">Customer First</span> - Our customers are at the heart of everything we
                do.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                ✓
              </div>
              <div>
                <span className="font-medium">Integrity</span> - We operate with honesty and transparency in all our
                dealings.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                ✓
              </div>
              <div>
                <span className="font-medium">Innovation</span> - We continuously seek new ways to improve our products
                and services.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                ✓
              </div>
              <div>
                <span className="font-medium">Sustainability</span> - We are committed to minimizing our environmental
                impact.
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg">
            <img src="/placeholder.svg?height=400&width=600" alt="ACME Team" className="w-full h-auto object-cover" />
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">AI-Enhanced Shopping Experience</h3>
            <p className="mb-4">
              At ACME, we leverage cutting-edge artificial intelligence to create a personalized and intuitive shopping
              experience. Our AI-powered features include:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                  ✓
                </div>
                <div>
                  <span className="font-medium">Personalized Product Recommendations</span> - Our AI analyzes your
                  preferences to suggest products you'll love.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                  ✓
                </div>
                <div>
                  <span className="font-medium">Intelligent Search</span> - Find exactly what you're looking for with
                  our AI-powered search.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                  ✓
                </div>
                <div>
                  <span className="font-medium">24/7 AI Shopping Assistant</span> - Get instant help and advice from our
                  virtual assistant.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mt-0.5">
                  ✓
                </div>
                <div>
                  <span className="font-medium">Smart Product Descriptions</span> - Detailed and accurate information to
                  help you make informed decisions.
                </div>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-lg">
            <img src="/placeholder.svg?height=300&width=600" alt="ACME Office" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-12 py-8 border-t">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { name: "Alex Johnson", role: "Founder & CEO", avatar: "/avatars/user-1.png" },
            { name: "Sarah Miller", role: "Head of Product", avatar: "/avatars/user-2.png" },
            { name: "Michael Chen", role: "CTO", avatar: "/avatars/user-3.png" },
            { name: "Emily Rodriguez", role: "Creative Director", avatar: "/placeholder.svg?height=100&width=100" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto mb-3 overflow-hidden rounded-full w-24 h-24">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}

