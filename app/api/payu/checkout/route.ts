import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
    try {
        const { items, customerInfo } = await req.json()

        const merchantKey = process.env.PAYU_MERCHANT_KEY!
        const merchantSalt = process.env.PAYU_MERCHANT_SALT!
        const mode = process.env.PAYU_MODE || 'test'
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

        // Calculate total amount
        const amount = items.reduce((total: number, item: any) => {
            return total + (item.price * item.quantity)
        }, 0)

        // Generate unique transaction ID
        const txnid = `TXN${Date.now()}`

        // Customer details (you can collect these in checkout form)
        const firstname = customerInfo?.name || 'Customer'
        const email = customerInfo?.email || 'customer@example.com'
        const phone = customerInfo?.phone || '9999999999'
        const address1 = customerInfo?.address || 'Address'
        const productinfo = items.map((item: any) => item.name).join(', ')

        // Success and failure URLs
        const surl = `${baseUrl}/api/payu/success`
        const furl = `${baseUrl}/api/payu/failure`

        // Generate hash
        // Hash formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
        const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${merchantSalt}`
        const hash = crypto.createHash('sha512').update(hashString).digest('hex')

        // PayU endpoint
        const payuUrl = mode === 'live'
            ? 'https://secure.payu.in/_payment'
            : 'https://test.payu.in/_payment'

        // Return payment form data
        return NextResponse.json({
            success: true,
            paymentData: {
                key: merchantKey,
                txnid,
                amount: amount.toFixed(2),
                productinfo,
                firstname,
                email,
                phone,
                address1,
                surl,
                furl,
                hash,
                payuUrl,
            }
        })
    } catch (error: any) {
        console.error('PayU checkout error:', error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
