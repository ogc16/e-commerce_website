import { OpenAI } from "openai"

// Create a function to get the OpenAI client - only to be used in server components or API routes
export function getOpenAIClient() {
  // Ensure this is only used on the server
  if (typeof window !== "undefined") {
    throw new Error("OpenAI client should only be used on the server")
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

