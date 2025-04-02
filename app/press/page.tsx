import Link from "next/link"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIChatbot from "@/components/ai-chatbot"

export default function PressPage() {
  const pressReleases = [
    {
      id: "pr1",
      title: "ACME Announces Expansion into European Markets",
      date: "June 15, 2023",
      excerpt:
        "ACME, a leading e-commerce retailer, today announced its expansion into European markets, bringing its premium product selection to customers across the continent.",
      link: "#",
    },
    {
      id: "pr2",
      title: "ACME Launches Sustainable Product Line",
      date: "April 22, 2023",
      excerpt:
        "In celebration of Earth Day, ACME has launched a new line of sustainable products made from eco-friendly materials and produced using renewable energy.",
      link: "#",
    },
    {
      id: "pr3",
      title: "ACME Reports Record Q1 Growth",
      date: "March 10, 2023",
      excerpt:
        "ACME today reported record first-quarter results, with revenue up 35% year-over-year, driven by strong customer acquisition and retention.",
      link: "#",
    },
  ]

  const newsArticles = [
    {
      id: "news1",
      title: "How ACME is Revolutionizing Online Shopping",
      publication: "Tech Today",
      date: "May 28, 2023",
      excerpt:
        "ACME's innovative approach to e-commerce is setting new standards in the industry, combining cutting-edge technology with exceptional customer service.",
      link: "#",
    },
    {
      id: "news2",
      title: "ACME Named Among Top 50 Places to Work",
      publication: "Business Weekly",
      date: "February 15, 2023",
      excerpt:
        "ACME has been recognized for its outstanding workplace culture, employee benefits, and commitment to diversity and inclusion.",
      link: "#",
    },
    {
      id: "news3",
      title: "ACME CEO Discusses Future of Retail in Exclusive Interview",
      publication: "Retail Insights",
      date: "January 5, 2023",
      excerpt:
        "In an exclusive interview, ACME's CEO shares insights on the future of retail and how the company is positioning itself for long-term success.",
      link: "#",
    },
  ]

  const mediaAssets = [
    {
      id: "asset1",
      title: "ACME Logo Pack",
      type: "ZIP",
      size: "5.2 MB",
      description: "Official ACME logos in various formats (PNG, SVG, EPS) for light and dark backgrounds.",
      link: "#",
    },
    {
      id: "asset2",
      title: "Product Images",
      type: "ZIP",
      size: "12.8 MB",
      description: "High-resolution images of ACME's flagship products for media use.",
      link: "#",
    },
    {
      id: "asset3",
      title: "Executive Headshots",
      type: "ZIP",
      size: "8.5 MB",
      description: "Professional headshots of ACME's executive team for media publications.",
      link: "#",
    },
    {
      id: "asset4",
      title: "Company Fact Sheet",
      type: "PDF",
      size: "1.2 MB",
      description: "Key facts and figures about ACME, including company history, mission, and achievements.",
      link: "#",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Press & Media</h1>
        <p className="text-muted-foreground">Latest news, press releases, and media resources</p>
      </div>

      <Tabs defaultValue="press-releases" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
          <TabsTrigger value="news">In the News</TabsTrigger>
          <TabsTrigger value="media-kit">Media Kit</TabsTrigger>
        </TabsList>

        <TabsContent value="press-releases" className="mt-6">
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <Card key={release.id}>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {release.date}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{release.title}</h3>
                  <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                  <Button variant="outline" asChild>
                    <Link href={release.link}>Read Full Release</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">View All Press Releases</Button>
          </div>
        </TabsContent>

        <TabsContent value="news" className="mt-6">
          <div className="space-y-6">
            {newsArticles.map((article) => (
              <Card key={article.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{article.publication}</span>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <Button variant="outline" asChild>
                    <Link href={article.link}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">View All News Coverage</Button>
          </div>
        </TabsContent>

        <TabsContent value="media-kit" className="mt-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Media Resources</h2>
            <p className="text-muted-foreground">
              Download official ACME assets for media use. For additional resources or specific requests, please contact
              our press team at press@acme.com.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mediaAssets.map((asset) => (
              <Card key={asset.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{asset.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded">{asset.type}</span>
                      <span className="text-xs text-muted-foreground">{asset.size}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={asset.link}>Download</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-2">Media Inquiries</h3>
            <p className="text-muted-foreground mb-4">
              For press inquiries, interview requests, or additional information, please contact our press team.
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> press@acme.com
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span> (555) 123-4567
              </p>
            </div>
            <Button className="mt-4" asChild>
              <Link href="/contact">Contact Press Team</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <AIChatbot />
    </div>
  )
}

