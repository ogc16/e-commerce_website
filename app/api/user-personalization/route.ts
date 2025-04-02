import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { userId, orders, wishlist } = await request.json()

    // Create a prompt for the OpenAI API
    const prompt = `
      You are an AI shopping assistant for an ecommerce store.
      
      User ID: ${userId}
      
      User's order history: ${JSON.stringify(orders)}
      
      User's wishlist: ${JSON.stringify(wishlist)}
      
      Based on this information, provide a personalized shopping recommendation for the user.
      Focus on suggesting products or collections that match their purchase history and interests.
      Keep it under 100 characters and make it sound helpful and engaging.
    `

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful shopping assistant that provides personalized recommendations." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    return NextResponse.json({
      personalization:
        response.choices[0].message.content?.trim() ||
        "Based on your recent purchases, you might enjoy our new collection of premium accessories.",
    })
  } catch (error) {
    console.error("Error generating user personalization:", error)
    return NextResponse.json(
      { personalization: "Based on your recent purchases, you might enjoy our new collection of premium accessories." },
      { status: 200 }, // Return a fallback personalization even on error
    )
  }
}

