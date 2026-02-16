"use client"

import { NavbarRefined } from "@/components/NavbarRefined"
import { useCart } from "@/lib/cart-store"
import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ShoppingBag, Loader2, AlertCircle, Smartphone, Check, Copy, ArrowRight, ArrowLeft } from "lucide-react"
import Image from "next/image"

const UPI_ID = "9738345492@hdfc"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, getTotalPrice, getTotalWeight, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [copied, setCopied] = useState(false)

  const cancelled = searchParams.get("cancelled")
  const errorParam = searchParams.get("error")

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [transactionId, setTransactionId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<'payu' | 'manual'>('payu')

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy")
    }
  }

  const handleProceedToPayment = () => {
    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      setError("Please fill in all details including address")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerInfo.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(customerInfo.phone)) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    setError("")
    setStep('payment')
  }

  const handlePayUPayment = async () => {
    setLoading(true)
    setError("")

    try {
      // Call PayU API
      const response = await fetch('/api/payu/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customerInfo: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: customerInfo.address,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate payment')
      }

      // Create form and submit to PayU
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.paymentData.payuUrl

      Object.entries(data.paymentData).forEach(([key, value]) => {
        if (key !== 'payuUrl') {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = value as string
          form.appendChild(input)
        }
      })

      document.body.appendChild(form)
      form.submit()
    } catch (err: any) {
      setError(err.message || 'Failed to initiate payment')
      setLoading(false)
    }
  }

  const handleConfirmPayment = async () => {
    if (!transactionId.trim()) {
      setError("Please enter your UPI Transaction ID / UTR number")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Build order details
      const orderDetails = {
        customer: customerInfo,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          weight: item.weight,
        })),
        total: getTotalPrice(),
        totalWeight: getTotalWeight(),
        transactionId: transactionId.trim(),
        timestamp: new Date().toISOString(),
      }

      console.log("Order placed:", orderDetails)

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Clear cart and show success
      clearCart()
      setStep('success')
    } catch (err) {
      setError("Failed to confirm order. Please contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && step !== 'success') {
    router.push("/cart")
    return null
  }

  const totalPrice = getTotalPrice()

  // Success Step
  if (step === 'success') {
    return (
      <div className="relative min-h-screen bg-[#F3E8E2]">
        <NavbarRefined />
        <main className="pt-40 pb-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/50 backdrop-blur-xl rounded-[3rem] p-12 shadow-xl">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check size={48} className="text-green-600" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif text-[#1A0F0A] mb-4">
                Order Confirmed!
              </h1>
              <p className="text-xl text-[#4A3728]/70 font-serif italic mb-8">
                Thank you for your order. We'll contact you shortly to confirm delivery details.
              </p>
              <div className="bg-[#F3E8E2] rounded-2xl p-6 mb-8">
                <p className="text-sm text-[#4A3728]/60 mb-2">Transaction Reference</p>
                <p className="font-mono text-lg font-bold text-[#1A0F0A]">{transactionId}</p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-3 bg-[#1A0F0A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#D98C8C] transition-all duration-500"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#F3E8E2]">
      <NavbarRefined />

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-7xl font-serif text-[#1A0F0A] mb-4">
              Checkout
            </h1>
            <p className="text-xl text-[#4A3728]/70 font-serif italic">
              {step === 'details' ? 'Enter your details' : 'Complete payment via UPI'}
            </p>
            
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[#D98C8C]' : 'text-[#4A3728]/40'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'details' ? 'bg-[#D98C8C] text-white' : 'bg-[#E5D5CB] text-[#4A3728]'}`}>1</span>
                <span className="text-sm font-bold uppercase tracking-widest">Details</span>
              </div>
              <span className="w-12 h-[2px] bg-[#E5D5CB]" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#D98C8C]' : 'text-[#4A3728]/40'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'payment' ? 'bg-[#D98C8C] text-white' : 'bg-[#E5D5CB] text-[#4A3728]'}`}>2</span>
                <span className="text-sm font-bold uppercase tracking-widest">Payment</span>
              </div>
            </div>
          </div>

          {/* Cancelled/Error Messages */}
          {cancelled && (
            <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-start gap-4 max-w-2xl mx-auto">
              <AlertCircle className="text-yellow-600 shrink-0" size={24} />
              <div>
                <h3 className="font-serif text-lg text-yellow-900 mb-1">Payment Cancelled</h3>
                <p className="text-sm text-yellow-700">Your payment was cancelled. You can try again when you're ready.</p>
              </div>
            </div>
          )}

          {(error || errorParam) && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4 max-w-2xl mx-auto">
              <AlertCircle className="text-red-600 shrink-0" size={24} />
              <div>
                <h3 className="font-serif text-lg text-red-900 mb-1">Error</h3>
                <p className="text-sm text-red-700">{error || errorParam}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary - Always visible */}
            <div className="bg-white/50 backdrop-blur-xl rounded-[3rem] p-8 shadow-xl h-fit">
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                <ShoppingBag size={24} className="text-[#D98C8C]" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F3E8E2] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-[#1A0F0A]">{item.name}</h3>
                      <p className="text-sm text-[#4A3728]/60">Quantity: {item.quantity}</p>
                      {item.weight && (
                        <p className="text-xs text-[#4A3728]/50">Weight: {item.weight}g × {item.quantity} = {item.weight * item.quantity}g</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#1A0F0A]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5D5CB] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8C7364]">Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                </div>
                {getTotalWeight() > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C7364]">Total Weight</span>
                    <span className="font-medium">{getTotalWeight()}g</span>
                  </div>
                )}
                <div className="border-t border-[#E5D5CB] pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-serif text-xl">Total</span>
                    <span className="font-serif text-2xl text-[#D98C8C]">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-white/50 backdrop-blur-xl rounded-[3rem] p-8 shadow-xl">
              {step === 'details' ? (
                <>
                  <h2 className="font-serif text-2xl mb-6">Customer Details</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest font-bold text-[#4A3728] mb-2 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="w-full bg-white/50 border border-[#E5D5CB] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D98C8C] transition-colors"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest font-bold text-[#4A3728] mb-2 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="w-full bg-white/50 border border-[#E5D5CB] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D98C8C] transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest font-bold text-[#4A3728] mb-2 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full bg-white/50 border border-[#E5D5CB] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D98C8C] transition-colors"
                        placeholder="9999999999"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest font-bold text-[#4A3728] mb-2 block">
                        Delivery Address *
                      </label>
                      <textarea
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        className="w-full bg-white/50 border border-[#E5D5CB] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D98C8C] transition-colors resize-none"
                        placeholder="Enter your complete delivery address"
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="w-full mt-8 bg-[#1A0F0A] text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={20} />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={() => setStep('details')}
                      className="p-2 rounded-full hover:bg-[#F3E8E2] transition-colors"
                    >
                      <ArrowLeft size={20} className="text-[#4A3728]" />
                    </button>
                    <h2 className="font-serif text-2xl">Choose Payment Method</h2>
                  </div>

                  {/* Amount to Pay */}
                  <div className="bg-[#D98C8C]/10 rounded-2xl p-4 mb-6 text-center">
                    <p className="text-sm text-[#4A3728]/60 mb-1">Amount to Pay</p>
                    <p className="font-serif text-3xl text-[#D98C8C]">₹{totalPrice.toFixed(2)}</p>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-4 mb-6">
                    {/* PayU Option - Recommended */}
                    <div 
                      className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                        paymentMethod === 'payu' 
                          ? 'border-[#D98C8C] bg-[#D98C8C]/5' 
                          : 'border-[#E5D5CB] bg-white/30 hover:border-[#D98C8C]/30'
                      }`}
                      onClick={() => setPaymentMethod('payu')}
                    >
                      {paymentMethod === 'payu' && (
                        <div className="absolute top-3 right-3 bg-[#D98C8C] text-white rounded-full p-1">
                          <Check size={14} />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">💳</div>
                        <div>
                          <h3 className="font-serif text-lg text-[#1A0F0A]">
                            PayU Secure Payment
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-sans font-bold">
                              RECOMMENDED
                            </span>
                          </h3>
                          <p className="text-sm text-[#4A3728]/60">
                            UPI, Cards, Net Banking, Wallets - All options available
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Manual UPI Option */}
                    <div 
                      className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                        paymentMethod === 'manual' 
                          ? 'border-[#D98C8C] bg-[#D98C8C]/5' 
                          : 'border-[#E5D5CB] bg-white/30 hover:border-[#D98C8C]/30'
                      }`}
                      onClick={() => setPaymentMethod('manual')}
                    >
                      {paymentMethod === 'manual' && (
                        <div className="absolute top-3 right-3 bg-[#D98C8C] text-white rounded-full p-1">
                          <Check size={14} />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">📱</div>
                        <div>
                          <h3 className="font-serif text-lg text-[#1A0F0A]">Manual UPI Payment</h3>
                          <p className="text-sm text-[#4A3728]/60">
                            Pay via QR code and enter transaction ID
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PayU Payment Button */}
                  {paymentMethod === 'payu' ? (
                    <>
                      <button
                        onClick={handlePayUPayment}
                        disabled={loading}
                        className="w-full bg-[#1A0F0A] text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>Redirecting to PayU...</span>
                          </>
                        ) : (
                          <>
                            <span>Proceed to Pay ₹{totalPrice.toFixed(2)}</span>
                            <ArrowRight size={20} />
                          </>
                        )}
                      </button>
                      <div className="flex items-center justify-center gap-2 text-xs text-[#4A3728]/40 mt-4">
                        <span>🔒 Secure payment by PayU</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Manual UPI Payment UI */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
                      <Image
                        src="/payments/upi-qr.png"
                        alt="UPI QR Code"
                        width={200}
                        height={200}
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    <p className="text-sm text-[#4A3728]/60 text-center">
                      Scan with any UPI app (GPay, PhonePe, Paytm, etc.)
                    </p>
                  </div>

                  {/* OR Divider */}
                  <div className="flex items-center gap-4 my-6">
                    <span className="flex-1 h-[1px] bg-[#E5D5CB]" />
                    <span className="text-xs uppercase tracking-widest font-bold text-[#4A3728]/40">Or pay to</span>
                    <span className="flex-1 h-[1px] bg-[#E5D5CB]" />
                  </div>

                  {/* UPI ID */}
                  <div className="bg-[#F3E8E2] rounded-2xl p-4 mb-6">
                    <p className="text-xs uppercase tracking-widest font-bold text-[#4A3728]/60 mb-2">UPI ID</p>
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-lg font-bold text-[#1A0F0A] flex-1">{UPI_ID}</p>
                      <button
                        onClick={copyUpiId}
                        className="p-2 rounded-full bg-white hover:bg-[#D98C8C] hover:text-white transition-all"
                        title="Copy UPI ID"
                      >
                        {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Transaction ID Input */}
                  <div className="mb-6">
                    <label className="text-xs uppercase tracking-widest font-bold text-[#4A3728] mb-2 block">
                      UPI Transaction ID / UTR Number *
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full bg-white/50 border border-[#E5D5CB] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D98C8C] transition-colors font-mono"
                      placeholder="Enter 12-digit UTR or Transaction ID"
                      required
                    />
                    <p className="text-xs text-[#4A3728]/50 mt-2">
                      You'll find this in your UPI app after payment
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    disabled={loading}
                    className="w-full bg-[#1A0F0A] text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Confirming Order...</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        <span>Confirm Payment</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#4A3728]/40 mt-6">
                    <Smartphone size={14} />
                    <span>Secure UPI Payment</span>
                  </div>
                  </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen bg-[#F3E8E2]">
        <NavbarRefined />
        <main className="pt-40 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-[#E5D5CB]/30 rounded-full w-64 mx-auto mb-4" />
              <div className="h-6 bg-[#E5D5CB]/20 rounded-full w-96 mx-auto" />
            </div>
          </div>
        </main>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
