import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const txnid = formData.get('txnid') as string
        const status = formData.get('status') as string

        // Redirect to checkout with error message
        const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        return NextResponse.redirect(
            new URL(`/checkout?cancelled=true&txnid=${txnid}&status=${status}`, redirectUrl)
        )
    } catch (error: any) {
        console.error('PayU failure handler error:', error)
        const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        return NextResponse.redirect(new URL('/checkout?error=server_error', redirectUrl))
    }
}
