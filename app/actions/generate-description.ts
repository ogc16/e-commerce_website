"use server"

import { getOpenAIClient } from "@/lib/openai"

export async function generateProductDescription(
  productName: string,
  category: string,
  features: string[],
  targetAudience = "general",
) {
  try {
    const prompt = `
      Generate a compelling product description for an ecommerce website.
      
      Product Name: ${productName}
      Category: ${category}
      Key Features: ${features.join(", ")}
      Target Audience: ${targetAudience}
      
      The description should be engaging, highlight the product's benefits, and be 2-3 paragraphs long.
      Use persuasive language that appeals to the target audience.
      Include SEO-friendly terms related to the product category.
    `

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional copywriter specializing in ecommerce product descriptions.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 350,
    })

    return {
      success: true,
      description: response.choices[0].message.content || "",
    }
  } catch (error) {
    console.error("Error generating product description:", error)
    return {
      success: false,
      error: "Failed to generate product description",
    }
  }
}

