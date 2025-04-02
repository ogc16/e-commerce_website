import { MapPin, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIChatbot from "@/components/ai-chatbot"

export default function CareersPage() {
  const jobOpenings = [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "We're looking for an experienced Frontend Developer to join our team and help build exceptional user experiences for our e-commerce platform.",
    },
    {
      id: "job2",
      title: "UX/UI Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      description:
        "Join our design team to create intuitive and visually appealing interfaces for our customers across web and mobile platforms.",
    },
    {
      id: "job3",
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description:
        "We're seeking a Product Manager to lead the development of new features and improvements to our e-commerce platform.",
    },
    {
      id: "job4",
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Remote",
      type: "Full-time",
      description:
        "Help our customers have the best shopping experience by providing exceptional support through various channels.",
    },
    {
      id: "job5",
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      description:
        "Join our marketing team to help plan and execute campaigns that drive customer acquisition and retention.",
    },
    {
      id: "job6",
      title: "Warehouse Associate",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      description:
        "Be part of our operations team ensuring orders are processed efficiently and accurately in our fulfillment center.",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Join Our Team</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're building the future of e-commerce and looking for talented individuals to join us on this journey
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <CardTitle>Innovation</CardTitle>
            <CardDescription>We're constantly pushing boundaries and exploring new ideas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              At ACME, we encourage creative thinking and experimentation. We believe that innovation comes from giving
              people the freedom to explore and take calculated risks.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <CardTitle>Collaboration</CardTitle>
            <CardDescription>We work together across teams to achieve our goals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We believe that the best results come from diverse teams working together. We foster an environment of
              open communication, mutual respect, and shared purpose.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <CardTitle>Impact</CardTitle>
            <CardDescription>We're committed to making a positive difference</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Every role at ACME contributes to our mission of providing exceptional products and experiences to our
              customers. We measure our success by the positive impact we create.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Open Positions</h2>

        <Tabs defaultValue="all" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Departments</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4">
              {jobOpenings.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.department}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.type}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{job.description}</p>
                      </div>
                      <Button className="md:self-start whitespace-nowrap">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="engineering" className="mt-6">
            <div className="grid gap-4">
              {jobOpenings
                .filter((job) => job.department === "Engineering")
                .map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.department}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {job.type}
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{job.description}</p>
                        </div>
                        <Button className="md:self-start whitespace-nowrap">Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="design" className="mt-6">
            <div className="grid gap-4">
              {jobOpenings
                .filter((job) => job.department === "Design")
                .map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.department}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {job.type}
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{job.description}</p>
                        </div>
                        <Button className="md:self-start whitespace-nowrap">Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="business" className="mt-6">
            <div className="grid gap-4">
              {jobOpenings
                .filter((job) => ["Marketing", "Product", "Customer Service", "Operations"].includes(job.department))
                .map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.department}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {job.type}
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{job.description}</p>
                        </div>
                        <Button className="md:self-start whitespace-nowrap">Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Benefits & Perks</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Flexible Work</h3>
              <p className="text-sm text-muted-foreground">
                Work from home, our office, or a mix of both. We focus on results, not where you work from.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v16"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Competitive Salary</h3>
              <p className="text-sm text-muted-foreground">
                We offer above-market compensation packages and regular salary reviews.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Health & Wellness</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive health insurance, wellness programs, and mental health support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Learning & Development</h3>
              <p className="text-sm text-muted-foreground">
                Professional development budget, learning resources, and growth opportunities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Paid Time Off</h3>
              <p className="text-sm text-muted-foreground">
                Generous vacation policy, paid holidays, and parental leave.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Team Events</h3>
              <p className="text-sm text-muted-foreground">
                Regular team outings, retreats, and social events to build connections.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join Us?</h2>
        <p className="mb-6 text-muted-foreground">
          Explore our open positions and find the perfect role for your skills and interests.
        </p>
        <Button size="lg" className="gap-2">
          View All Positions <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <AIChatbot />
    </div>
  )
}

