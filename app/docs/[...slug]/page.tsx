import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Function to read and parse markdown files
async function getDocContent(slug: string[]) {
  try {
    const filePath = path.join(process.cwd(), "docs", `${slug.join("-")}.md`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    return fileContent
  } catch (error) {
    console.error("Error reading doc file:", error)
    return null
  }
}

export default async function DocPage({ params }: { params: { slug: string[] } }) {
  const content = await getDocContent(params.slug)

  if (!content) {
    notFound()
  }

  // Simple markdown to HTML conversion (in a real app, use a proper markdown parser)
  const htmlContent = content
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n- (.*)/g, '<li class="ml-6 list-disc">$1</li>')
    .replace(/\n\d+\. (.*)/g, '<li class="ml-6 list-decimal">$1</li>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-primary hover:underline">$1</a>')

  return (
    <div className="container py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Documentation</h3>
          <nav className="flex flex-col space-y-2">
            <Link href="/docs/guide" className="text-sm hover:text-primary">
              Complete Guide
            </Link>
            <Link href="/docs/customer-guide" className="text-sm hover:text-primary">
              Customer Guide
            </Link>
            <Link href="/docs/admin-guide" className="text-sm hover:text-primary">
              Admin Guide
            </Link>
            <Link href="/docs/technical-guide" className="text-sm hover:text-primary">
              Technical Guide
            </Link>
          </nav>
        </div>

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  )
}

