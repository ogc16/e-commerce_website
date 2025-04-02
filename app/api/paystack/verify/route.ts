import { NextResponse } from "next/server"
import { createOrder, updateProductInventory } from "@/lib/db"
import { sendOrderConfirmationEmail } from "@/lib/email"

// In a real app, you would use environment variables for these
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "your_paystack_secret_key"
const PAYSTACK_API_URL = "https://api.paystack.co/transaction/verify"

export async function GET(request: Request) {
  try {
    // Get the reference from the URL
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get("reference")

    if (!reference) {
      return NextResponse.json({ error: "Reference is required" }, { status: 400 })
    }

    // Make the request to Paystack to verify the transaction
    const response = await fetch(`${PAYSTACK_API_URL}/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error("Paystack verification error:", responseData)
      return NextResponse.json({ error: "Failed to verify payment" }, { status: response.status })
    }

    // Extract data from Paystack response
    const { status, metadata } = responseData.data

    if (status === "success") {
      // Create order in database
      const orderData = {
        reference,
        date: new Date().toISOString(),
        status: "processing" as const,
        paymentStatus: "paid" as const,
        paymentMethod: "Paystack",
        items: metadata.cart_items || [],
        customer: {
          name: metadata.customer_name || "",
          email: responseData.data.customer.email,
          phone: metadata.customer_phone || "",
        },
        shipping: metadata.shipping_address || {
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
        subtotal: metadata.cart_items.reduce((total: number, item: any) => total + item.price * item.quantity, 0),
        shipping: 10.0, // Fixed shipping cost
        tax: metadata.cart_items.reduce((total: number, item: any) => total + item.price * item.quantity, 0) * 0.05,
        total: responseData.data.amount / 100, // Convert from kobo to naira
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }

      const order = await createOrder(orderData)

      // Update inventory for each product
      for (const item of order.items) {
        await updateProductInventory(item.id, item.quantity)
      }

      try {
        // Send confirmation email
        await sendOrderConfirmationEmail({
          to: order.customer.email,
          subject: `Order Confirmation #${order.id}`,
          orderDetails: order,
        })
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError)
        // Continue with the order process even if email fails
      }

      // Return the verification status
      return NextResponse.json({
        status: "success",
        reference: responseData.data.reference,
        amount: responseData.data.amount / 100, // Convert back to main currency unit
        paidAt: responseData.data.paid_at,
        channel: responseData.data.channel,
        currency: responseData.data.currency,
        customer: {
          email: responseData.data.customer.email,
        },
        metadata: responseData.data.metadata,
        orderId: order.id,
      })
    } else {
      return NextResponse.json(
        {
          status: "failed",
          message: "Payment was not successful",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

