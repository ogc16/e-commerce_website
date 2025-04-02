import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { selectedCategories, priceRange, recentlyViewed } = await request.json()

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key is not configured")
      return NextResponse.json({
        suggestion: "Check out our latest arrivals, handpicked for quality and style!",
      })
    }

    // Create a prompt for the OpenAI API
    const prompt = `
      You are an AI shopping assistant for an ecommerce store.
      
      User's selected categories: ${JSON.stringify(selectedCategories)}
      User's price range: $${priceRange[0]} - $${priceRange[1]}
      User's recently viewed products: ${JSON.stringify(recentlyViewed)}
      
      Based on this information, provide a short, personalized shopping suggestion for the user.
      Keep it under 100 characters and make it sound helpful and engaging.
      Focus on suggesting products or collections that match their interests.
    `

    try {
      const openai = getOpenAIClient()
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful shopping assistant that provides personalized product suggestions.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 100,
      })

      return NextResponse.json({
        suggestion:
          response.choices[0].message.content?.trim() ||
          "Check out our latest arrivals, handpicked for quality and style!",
      })
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError)
      // Return a fallback suggestion even on OpenAI error
      return NextResponse.json({
        suggestion: "Check out our latest arrivals, handpicked for quality and style!",
      })
    }
  } catch (error) {
    console.error("Error generating shopping suggestion:", error)
    // Return a fallback suggestion even on error
    return NextResponse.json({
      suggestion: "Check out our latest arrivals, handpicked for quality and style!",
    })
  }
}

