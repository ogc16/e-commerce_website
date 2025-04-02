import { Resend } from "resend"
import type { Order } from "./db"

// Initialize Resend with the API key, but only if we're on the server and the key exists
function getResendClient() {
  // Ensure this is only used on the server
  if (typeof window !== "undefined") {
    throw new Error("Resend client should only be used on the server")
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn("Resend API key is not configured. Email functionality will be simulated.")
    return null
  }

  return new Resend(apiKey)
}

export interface EmailOptions {
  to: string
  subject: string
  orderDetails: Order
}

export async function sendOrderConfirmationEmail(options: EmailOptions): Promise<boolean> {
  try {
    const { to, subject, orderDetails } = options

    // Format the order items for the email
    const formattedItems = orderDetails.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price.toFixed(2),
      total: (item.price * item.quantity).toFixed(2),
    }))

    // Get the Resend client
    const resend = getResendClient()

    // If Resend client is not available, simulate sending email
    if (!resend) {
      console.log("Simulating email send to:", to)
      console.log("Subject:", subject)
      console.log("Order details:", orderDetails)
      return true
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "orders@acme-ecommerce.com",
      to,
      subject,
      html: generateOrderConfirmationHTML(orderDetails, formattedItems),
    })

    if (error) {
      console.error("Error sending email:", error)
      return false
    }

    console.log("Email sent successfully:", data)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// Generate HTML for the order confirmation email
function generateOrderConfirmationHTML(order: Order, items: any[]) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          background-color: #f9f9f9;
        }
        .order-details {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 5px;
        }
        .order-items {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .order-items th, .order-items td {
          padding: 10px;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
        .order-items th {
          background-color: #f9f9f9;
        }
        .footer {
          text-align: center;
          padding: 20px 0;
          font-size: 12px;
          color: #777;
        }
        .total-row {
          font-weight: bold;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Order Confirmation</h1>
        <p>Thank you for your purchase!</p>
      </div>
      
      <div class="order-details">
        <h2>Order #${order.id}</h2>
        <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
        <p>Status: ${order.status.toUpperCase()}</p>
        
        <h3>Items</h3>
        <table class="order-items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${item.total}</td>
              </tr>
            `,
              )
              .join("")}
            <tr>
              <td colspan="3" style="text-align: right;">Subtotal:</td>
              <td>$${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right;">Shipping:</td>
              <td>$${order.shipping.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right;">Tax:</td>
              <td>$${order.tax.toFixed(2)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="3" style="text-align: right;">Total:</td>
              <td>$${order.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        
        <h3>Shipping Address</h3>
        <p>
          ${order.customer.name}<br>
          ${order.shipping.address}<br>
          ${order.shipping.city}, ${order.shipping.state} ${order.shipping.zipCode}<br>
          ${order.shipping.country}
        </p>
        
        <h3>Payment Information</h3>
        <p>Method: ${order.paymentMethod}</p>
        <p>Status: ${order.paymentStatus.toUpperCase()}</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/order-confirmation?reference=${order.reference}" class="button">View Order Details</a>
        </div>
      </div>
      
      <div class="footer">
        <p>If you have any questions about your order, please contact our customer support at support@acme-ecommerce.com</p>
        <p>&copy; ${new Date().getFullYear()} ACME Ecommerce. All rights reserved.</p>
      </div>
    </body>
    </html>
  `
}

