"use server"

import { sendOrderConfirmationEmail } from "@/lib/email"

export async function sendTestEmail(email: string) {
  try {
    // Create a mock order for testing
    const mockOrder = {
      id: `TEST-${Date.now()}`,
      reference: `REF-TEST-${Date.now()}`,
      date: new Date().toISOString(),
      status: "processing" as const,
      paymentStatus: "paid" as const,
      paymentMethod: "Paystack",
      items: [
        {
          id: "1",
          name: "Test Product 1",
          price: 99.99,
          image: "/products/premium-backpack-1.png",
          quantity: 1,
        },
        {
          id: "2",
          name: "Test Product 2",
          price: 49.99,
          image: "/products/wireless-earbuds.png",
          quantity: 2,
        },
      ],
      customer: {
        name: "Test Customer",
        email: email,
        phone: "+1234567890",
      },
      shipping: {
        address: "123 Test Street",
        city: "Test City",
        state: "Test State",
        zipCode: "12345",
        country: "Test Country",
      },
      subtotal: 199.97,
      shipping: 10.0,
      tax: 10.0,
      total: 219.97,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key is not configured. Email functionality will be simulated.")
      return {
        success: true,
        message: "Test email simulated successfully (Resend API key not configured)",
      }
    }

    // Send the test email
    const success = await sendOrderConfirmationEmail({
      to: email,
      subject: "Test Order Confirmation",
      orderDetails: mockOrder,
    })

    return { success, message: success ? "Test email sent successfully" : "Failed to send test email" }
  } catch (error) {
    console.error("Error sending test email:", error)
    return { success: false, message: "An error occurred while sending the test email" }
  }
}

