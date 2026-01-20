import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()

        const status = formData.get('status') as string
        const txnid = formData.get('txnid') as string
        const amount = formData.get('amount') as string
        const productinfo = formData.get('productinfo') as string
        const firstname = formData.get('firstname') as string
        const email = formData.get('email') as string
        const hash = formData.get('hash') as string

        const merchantSalt = process.env.PAYU_MERCHANT_SALT!
        const merchantKey = process.env.PAYU_MERCHANT_KEY!

        // Verify hash for security
        // Reverse hash formula: sha512(salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
        const reverseHashString = `${merchantSalt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${merchantKey}`
        const calculatedHash = crypto.createHash('sha512').update(reverseHashString).digest('hex')

        if (calculatedHash !== hash) {
            return NextResponse.redirect(new URL('/checkout?error=invalid_hash', process.env.NEXT_PUBLIC_APP_URL!))
        }

        if (status === 'success') {
            // Payment successful - redirect to success page
            return NextResponse.redirect(new URL(`/checkout/success?txnid=${txnid}`, process.env.NEXT_PUBLIC_APP_URL!))
        } else {
            // Payment failed
            return NextResponse.redirect(new URL('/checkout?error=payment_failed', process.env.NEXT_PUBLIC_APP_URL!))
        }
    } catch (error: any) {
        console.error('PayU success handler error:', error)
        return NextResponse.redirect(new URL('/checkout?error=server_error', process.env.NEXT_PUBLIC_APP_URL!))
    }
}
