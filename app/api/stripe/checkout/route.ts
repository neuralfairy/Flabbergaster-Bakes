import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
})

export async function POST(req: NextRequest) {
    try {
        const { items } = await req.json()

        // Create line items for Stripe
        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: process.env.STRIPE_CURRENCY || 'inr',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100), // Convert to cents/paise
            },
            quantity: item.quantity,
        }))

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancelled=true`,
            metadata: {
                orderItems: JSON.stringify(items),
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error: any) {
        console.error('Stripe checkout error:', error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
