import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    // System message to define the chatbot's behavior
    const systemMessage = {
      role: "system",
      content: `
        You are an AI shopping assistant for ACME, an ecommerce store. 
        Your name is ACME Assistant.
        
        Store information:
        - We sell clothing, electronics, accessories, and home goods
        - Our return policy allows returns within 30 days of purchase
        - We offer free shipping on orders over $50
        - We ship to the US and Canada only
        - Our customer service email is support@acme.com
        
        Be helpful, friendly, and concise in your responses. If you don't know the answer to a question, 
        suggest that the customer contact our support team at support@acme.com.
        
        For product recommendations, suggest items based on the customer's interests.
        For order tracking, ask for an order number and then explain that you would check the status.
        For pricing questions, provide general information about our pricing structure.
      `,
    }

    // Prepare the messages for the API call
    const apiMessages = [
      systemMessage,
      ...messages.slice(-10), // Only use the last 10 messages to save tokens
    ]

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 250,
    })

    return NextResponse.json({
      message: response.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}

