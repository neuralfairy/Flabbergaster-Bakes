import nodemailer from 'nodemailer'

export interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  paymentStatus: string
  paymentMethod: string
  customerPhone?: string
  customerAddress?: string
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'your-email@example.com'
  const fromEmail = process.env.EMAIL_USER || 'your-email@gmail.com'

  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `Flabbergaster Bakes <${fromEmail}>`,
      to: adminEmail,
      subject: `🎂 New Order Received - ${data.orderId}`,
      html: generateOrderEmailHTML(data),
    }

    const info = await transporter.sendMail(mailOptions)
    
    console.log('Order confirmation email sent:', info.messageId)
    return { success: true, data: info }
  } catch (error) {
    console.error('Failed to send order email:', error)
    return { success: false, error }
  }
}

function generateOrderEmailHTML(data: OrderEmailData): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price.toFixed(2)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order - ${data.orderId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #D98C8C 0%, #C77B7B 100%); padding: 40px 30px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎂 Flabbergaster Bakes</h1>
      <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">New Order Received!</p>
    </div>

    <!-- Order Info -->
    <div style="padding: 30px; background-color: #ffffff;">
      <div style="background-color: #f9fafb; border-left: 4px solid #D98C8C; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
        <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Order ID:</td>
            <td style="padding: 8px 0; color: #1f2937; font-weight: 700; text-align: right;">${data.orderId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Payment Status:</td>
            <td style="padding: 8px 0; text-align: right;">
              <span style="background-color: #10b981; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${data.paymentStatus}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Payment Method:</td>
            <td style="padding: 8px 0; color: #1f2937; text-align: right; font-weight: 600;">${data.paymentMethod}</td>
          </tr>
        </table>
      </div>

      <!-- Customer Information -->
      <div style="margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Name:</td>
            <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${data.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Email:</td>
            <td style="padding: 8px 0; color: #1f2937;">${data.customerEmail}</td>
          </tr>
          ${data.customerPhone ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Phone:</td>
            <td style="padding: 8px 0; color: #1f2937;">${data.customerPhone}</td>
          </tr>
          ` : ''}
          ${data.customerAddress ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Address:</td>
            <td style="padding: 8px 0; color: #1f2937;">${data.customerAddress}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <!-- Order Items -->
      <div style="margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="padding: 12px; text-align: left; color: #6b7280; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Product</th>
              <th style="padding: 12px; text-align: center; color: #6b7280; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Qty</th>
              <th style="padding: 12px; text-align: right; color: #6b7280; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Price</th>
              <th style="padding: 12px; text-align: right; color: #6b7280; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
          <tfoot>
            <tr style="background-color: #f9fafb;">
              <td colspan="3" style="padding: 16px; text-align: right; font-weight: 700; color: #1f2937; font-size: 18px;">Total Amount:</td>
              <td style="padding: 16px; text-align: right; font-weight: 700; color: #D98C8C; font-size: 18px;">₹${data.totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Action Required -->
      <div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 20px; border-radius: 8px; margin-top: 30px;">
        <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 14px;">⚡ Action Required:</p>
        <p style="margin: 10px 0 0 0; color: #92400e; font-size: 14px;">Please prepare this order and contact the customer to confirm delivery details.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">© ${new Date().getFullYear()} Flabbergaster Bakes</p>
      <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">This is an automated notification email</p>
    </div>
  </div>
</body>
</html>
  `
}
