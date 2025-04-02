import { NextResponse } from "next/server"

// In a real app, you would use environment variables for these
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "your_paystack_secret_key"
const PAYSTACK_API_URL = "https://api.paystack.co/transaction/initialize"

export async function POST(request: Request) {
  try {
    const { email, amount, metadata } = await request.json()

    // Validate required fields
    if (!email || !amount) {
      return NextResponse.json({ error: "Email and amount are required" }, { status: 400 })
    }

    // Generate a unique reference
    const reference = `ACME-${Date.now()}-${Math.floor(Math.random() * 1000000)}`

    // Prepare the request to Paystack
    const paystackData = {
      email,
      amount, // Amount should be in the smallest currency unit (kobo for NGN)
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout`,
      metadata,
    }

    // Make the request to Paystack
    const response = await fetch(PAYSTACK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paystackData),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error("Paystack error:", responseData)
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: response.status })
    }

    // Return the Paystack response
    return NextResponse.json(responseData.data)
  } catch (error) {
    console.error("Error initializing payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

