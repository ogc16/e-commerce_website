import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { products, userHistory, currentProduct } = await request.json()

    // Create a prompt for the OpenAI API
    const prompt = `
      You are an AI shopping assistant for an ecommerce store.
      
      Current product being viewed: ${JSON.stringify(currentProduct)}
      
      User's browsing/purchase history: ${JSON.stringify(userHistory)}
      
      Available products in catalog: ${JSON.stringify(products)}
      
      Based on the current product and user history, recommend 4 products from the catalog that this user might be interested in.
      Return ONLY a JSON array of product IDs, nothing else. Format: ["id1", "id2", "id3", "id4"]
    `

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful shopping assistant that provides personalized product recommendations.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 150,
    })

    // Extract and parse the recommended product IDs
    const recommendationText = response.choices[0].message.content?.trim() || "[]"
    let recommendedProductIds

    try {
      recommendedProductIds = JSON.parse(recommendationText)
    } catch (e) {
      // If parsing fails, extract IDs using regex as fallback
      const matches = recommendationText.match(/"([^"]*)"/g)
      recommendedProductIds = matches ? matches.map((m) => m.replace(/"/g, "")) : []
    }

    // Get the full product details for the recommended IDs
    const recommendedProducts = products.filter((product: any) => recommendedProductIds.includes(product.id))

    return NextResponse.json({
      recommendations: recommendedProducts.slice(0, 4),
    })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

