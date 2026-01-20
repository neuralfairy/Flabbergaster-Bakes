"use client"

import { NavbarRefined } from "@/components/NavbarRefined"
import { useCart } from "@/lib/cart-store"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CreditCard, ShoppingBag, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, getTotalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const cancelled = searchParams.get("cancelled")

  const handleCheckout = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      // Redirect to Stripe Hosted Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
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
          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
              <AlertCircle className="text-red-600 shrink-0" size={24} />
              <div>
                <h3 className="font-serif text-lg text-red-900 mb-1">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
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
                Secure Payment
              </h2>

              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#D98C8C]/10 rounded-full flex items-center justify-center mx-auto">
                    <CreditCard size={40} className="text-[#D98C8C]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#1A0F0A] mb-2">
                      Powered by Stripe
                    </h3>
                    <p className="text-sm text-[#4A3728]/60 max-w-sm mx-auto">
                      You'll be redirected to Stripe's secure checkout page to complete your payment safely.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-[#1A0F0A] text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-[#4A3728]/40">
                  <span>🔒 Secure SSL Encryption</span>
                  <span>•</span>
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
