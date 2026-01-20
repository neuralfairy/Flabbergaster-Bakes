import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const txnid = formData.get('txnid') as string
        const status = formData.get('status') as string

        // Redirect to checkout with error message
        return NextResponse.redirect(
            new URL(`/checkout?cancelled=true&txnid=${txnid}&status=${status}`, process.env.NEXT_PUBLIC_APP_URL!)
        )
    } catch (error: any) {
        console.error('PayU failure handler error:', error)
        return NextResponse.redirect(new URL('/checkout?error=server_error', process.env.NEXT_PUBLIC_APP_URL!))
    }
}
