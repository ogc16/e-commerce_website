import { redirect } from "next/navigation"

export default function DocsPage() {
  // Redirect to the main guide
  redirect("/docs/guide")
}

