"use client"

import { NavbarRefined } from "@/components/NavbarRefined"
import { useCart } from "@/lib/cart-store"
import { Suspense, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CreditCard, ShoppingBag, Loader2, AlertCircle, X, Smartphone, Check } from "lucide-react"
import Image from "next/image"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, getTotalPrice, getTotalWeight } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const cancelled = searchParams.get("cancelled")
  const errorParam = searchParams.get("error")

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleCheckout = async () => {
    // Check cooldown
    if (cooldown > 0) {
      setError(`Please wait ${cooldown} seconds before trying again`)
      return
    }

    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      setError("Please fill in all details including address")
      return
    }

    setLoading(true)
    setError("")

    const totalPrice = getTotalPrice()

    try {
      // Initiate PayU payment
      const response = await fetch('/api/payu/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice.toFixed(2),
          firstname: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          productinfo: `Order from Flabbergaster Bakes - ${items.length} items`,
          address: customerInfo.address,
        }),
      })

      const data = await response.json()

      if (data.success && data.paymentData) {
        // Create form and submit to PayU
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = data.payuUrl

        // Add all payment parameters as hidden fields
        Object.keys(data.paymentData).forEach((key) => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = data.paymentData[key]
          form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()
      } else {
        const errorMsg = data.error || 'Failed to initiate payment. Please try again.'
        setError(errorMsg)
        setLoading(false)
        
        // Set cooldown if rate limited
        if (errorMsg.toLowerCase().includes('too many') || errorMsg.toLowerCase().includes('rate')) {
          setCooldown(60)
          const interval = setInterval(() => {
            setCooldown(prev => {
              if (prev <= 1) {
                clearInterval(interval)
                return 0
              }
              return prev - 1
            })
          }, 1000)
        }
      }
    } catch (error) {
      console.error('Payment initiation error:', error)
      setError('Failed to initiate payment. Please try again later.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const totalPrice = getTotalPrice()

  return (
    <div className="relative min-h-screen bg-[#F3E8E2]">
      <NavbarRefined />

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-serif text-[#1A0F0A] mb-4">
              Checkout
            </h1>
            <p className="text-xl text-[#4A3728]/70 font-serif italic">
              Review your order and proceed to secure payment
            </p>
          </div>

          {/* Cancelled Message */}
          {cancelled && (
            <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-start gap-4">
              <AlertCircle className="text-yellow-600 shrink-0" size={24} />
              <div>
                <h3 className="font-serif text-lg text-yellow-900 mb-1">Payment Cancelled</h3>
                <p className="text-sm text-yellow-700">Your payment was cancelled. You can try again when you're ready.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {(error || errorParam) && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
              <AlertCircle className="text-red-600 shrink-0" size={24} />
              <div>
                <h3 className="font-serif text-lg text-red-900 mb-1">Error</h3>
                <p className="text-sm text-red-700">{error || errorParam}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white/50 backdrop-blur-xl rounded-[3rem] p-8 shadow-xl">
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
                    <span className="font-serif text-2xl">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white/50 backdrop-blur-xl rounded-[3rem] p-8 shadow-xl flex flex-col">
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                <CreditCard size={24} className="text-[#D98C8C]" />
                Customer Details
              </h2>

              <div className="flex-1 space-y-6">
                {/* Customer Info Form */}
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

                <div className="pt-8 mt-4 border-t border-[#E5D5CB]">
                  <button
                    onClick={handleCheckout}
                    disabled={loading || cooldown > 0}
                    className="w-full bg-[#1A0F0A] text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : cooldown > 0 ? (
                      <>
                        <AlertCircle size={20} />
                        <span>Please wait {cooldown}s</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        <span>Proceed to Payment</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-[#4A3728]/40 mt-6">
                  <Smartphone size={14} />
                  <span>Secure Payment via PayU (UPI, Cards & More)</span>
                </div>
              </div>
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
