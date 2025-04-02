import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { categoryId, categoryName } = await request.json()

    // Create a prompt for the OpenAI API
    const prompt = `
      You are an AI shopping assistant for an ecommerce store.
      
      Category ID: ${categoryId}
      Category Name: ${categoryName}
      
      Provide a brief, engaging insight about this product category that would help shoppers.
      Focus on the benefits, quality, and unique aspects of products in this category.
      Keep it under 100 characters and make it sound helpful and engaging.
    `

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful shopping assistant that provides insights about product categories.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    return NextResponse.json({
      insight:
        response.choices[0].message.content?.trim() ||
        `Our ${categoryName} collection features premium quality items designed for style and functionality.`,
    })
  } catch (error) {
    console.error("Error generating category insight:", error)
    return NextResponse.json(
      {
        insight: `Our ${categoryName} collection features premium quality items designed for style and functionality.`,
      },
      { status: 200 }, // Return a fallback insight even on error
    )
  }
}

