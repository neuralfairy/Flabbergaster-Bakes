import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()

        const status = formData.get('status') as string
        const txnid = formData.get('txnid') as string
        const amount = formData.get('amount') as string
        const productinfo = formData.get('productinfo') as string
        const firstname = formData.get('firstname') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const address1 = formData.get('address1') as string
        const hash = formData.get('hash') as string

        const merchantSalt = process.env.PAYU_MERCHANT_SALT!
        const merchantKey = process.env.PAYU_MERCHANT_KEY!

        // Verify hash for security
        // Reverse hash formula: sha512(salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
        // Exactly 10 pipes for 10 UDF fields between status and email
        const reverseHashString = `${merchantSalt}|${status}||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${merchantKey}`
        const calculatedHash = crypto.createHash('sha512').update(reverseHashString).digest('hex')

        if (calculatedHash !== hash) {
            console.error('Hash Mismatch!', { calculatedHash, receivedHash: hash })
            const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
            return NextResponse.redirect(new URL('/checkout?error=invalid_hash', redirectUrl))
        }

        const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        
        if (status === 'success') {
            // Parse product info into items array
            const productNames = productinfo.split(', ')
            const items = productNames.map((name) => {
                // Try to extract quantity if format is "Product Name (x2)" 
                const match = name.match(/^(.+?)\s*\(x(\d+)\)$/)
                if (match) {
                    return {
                        name: match[1],
                        quantity: parseInt(match[2]),
                        price: parseFloat(amount) / productNames.length / parseInt(match[2]) || 0
                    }
                }
                return {
                    name: name,
                    quantity: 1,
                    price: parseFloat(amount) / productNames.length || 0
                }
            })

            // Send order confirmation email (non-blocking)
            sendOrderConfirmationEmail({
                orderId: txnid,
                customerName: firstname,
                customerEmail: email,
                customerPhone: phone || undefined,
                customerAddress: address1 || undefined,
                items: items,
                totalAmount: parseFloat(amount),
                paymentStatus: 'PAID',
                paymentMethod: 'PayU (UPI/Card/Net Banking)',
            }).catch((error) => {
                // Log error but don't block the payment success flow
                console.error('Failed to send order confirmation email:', error)
            })

            // Payment successful - redirect to success page
            return NextResponse.redirect(new URL(`/checkout/success?txnid=${txnid}`, redirectUrl))
        } else {
            // Payment failed
            return NextResponse.redirect(new URL('/checkout?error=payment_failed', redirectUrl))
        }
    } catch (error: any) {
        console.error('PayU success handler error:', error)
        const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        return NextResponse.redirect(new URL('/checkout?error=server_error', redirectUrl))
    }
}
