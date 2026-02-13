import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Generate PayU hash
function generateHash(data: string, salt: string): string {
  return crypto.createHash('sha512').update(data + salt).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      amount, 
      firstname, 
      email, 
      phone, 
      productinfo,
      address 
    } = body

    // Validate required fields
    if (!amount || !firstname || !email || !phone || !productinfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const merchantKey = process.env.PAYU_MERCHANT_KEY
    const merchantSalt = process.env.PAYU_MERCHANT_SALT

    if (!merchantKey || !merchantSalt) {
      return NextResponse.json(
        { error: 'PayU credentials not configured' },
        { status: 500 }
      )
    }

    // Generate unique transaction ID
    const txnid = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
    
    // Callback URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const surl = `${baseUrl}/api/payu/success`
    const furl = `${baseUrl}/api/payu/failure`

    // UDF fields - must match what's sent in payment data
    const udf1 = address || ''
    const udf2 = ''
    const udf3 = ''
    const udf4 = ''
    const udf5 = ''

    // Generate hash
    // Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|SALT
    const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||`
    const hash = generateHash(hashString, merchantSalt)

    // Prepare PayU payment data
    const paymentData = {
      key: merchantKey,
      txnid,
      amount: parseFloat(amount).toFixed(2),
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      hash,
      address1: address || '',
      // UDF (User Defined Fields) - can store custom data
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
      // PayU specific configurations
      drop_category: 'NB,DC,EMI', // This will hide other payment methods and prioritize UPI
      enforce_paymethod: 'upi', // This enforces UPI as default payment method
    }

    return NextResponse.json({
      success: true,
      paymentData,
      payuUrl: process.env.NEXT_PUBLIC_PAYU_URL || 'https://test.payu.in/_payment'
    })

  } catch (error) {
    console.error('PayU initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}
