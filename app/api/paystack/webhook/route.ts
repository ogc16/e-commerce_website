import { NextResponse } from "next/server"
import crypto from "crypto"

// In a real app, you would use environment variables for these
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "your_paystack_secret_key"

export async function POST(request: Request) {
  try {
    // Get the signature from the headers
    const signature = request.headers.get("x-paystack-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature found" }, { status: 400 })
    }

    // Get the raw body
    const body = await request.text()

    // Verify the signature
    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(body).digest("hex")

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Parse the body
    const event = JSON.parse(body)

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        // Handle successful charge
        // In a real app, you would:
        // 1. Update order status in your database
        // 2. Send confirmation emails
        // 3. Update inventory
        console.log("Charge successful:", event.data)
        break

      case "transfer.success":
        // Handle successful transfer
        console.log("Transfer successful:", event.data)
        break

      case "subscription.create":
        // Handle subscription creation
        console.log("Subscription created:", event.data)
        break

      case "invoice.payment_failed":
        // Handle failed invoice payment
        console.log("Invoice payment failed:", event.data)
        break

      default:
        // Handle other events
        console.log("Unhandled event:", event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

