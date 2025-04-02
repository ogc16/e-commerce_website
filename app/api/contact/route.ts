import { NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // In a real app, you would save this to a database and send an email
    console.log("Contact form submission:", { name, email, subject, message })

    // Generate AI response based on the message
    const prompt = `
      You are an AI assistant for an ecommerce store named ACME.
      
      A customer has submitted a contact form with the following details:
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
      
      Generate a brief, personalized response acknowledging their message.
      If their message contains a question or issue, provide a helpful initial response.
      Keep it under 150 characters and make it sound friendly and professional.
    `

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful customer service assistant for an ecommerce store." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 150,
    })

    const aiResponse =
      response.choices[0].message.content?.trim() ||
      "Thanks for reaching out! We've received your message and will get back to you within 24 hours."

    return NextResponse.json({
      success: true,
      aiResponse,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      {
        success: false,
        aiResponse: "Thanks for reaching out! We've received your message and will get back to you within 24 hours.",
      },
      { status: 200 }, // Return a fallback response even on error
    )
  }
}

