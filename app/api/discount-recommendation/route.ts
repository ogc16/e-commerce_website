import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { recentlyViewed, previousPurchases } = await request.json()

    // Create a prompt for the OpenAI API
    const prompt = `
      You are an AI shopping assistant for an ecommerce store.
      
      User's recently viewed products: ${JSON.stringify(recentlyViewed)}
      User's previous purchases: ${JSON.stringify(previousPurchases)}
      
      Based on this information, provide a personalized discount recommendation for the user.
      Make it specific to a product category or type that matches their interests.
      Include a discount code they can use.
      Keep it under 100 characters and make it sound enticing.
    `

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful shopping assistant that provides personalized discount recommendations.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    return NextResponse.json({
      recommendation:
        response.choices[0].message.content?.trim() ||
        "Take an extra 10% off any item in our Electronics category with code TECH10!",
    })
  } catch (error) {
    console.error("Error generating discount recommendation:", error)
    return NextResponse.json(
      { recommendation: "Take an extra 10% off any item in our Electronics category with code TECH10!" },
      { status: 200 }, // Return a fallback recommendation even on error
    )
  }
}

