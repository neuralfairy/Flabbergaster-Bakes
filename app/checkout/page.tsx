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
  const formRef = useRef<HTMLFormElement>(null)

  const cancelled = searchParams.get("cancelled")
  const errorParam = searchParams.get("error")

  const [showUPIModal, setShowUPIModal] = useState(false)
  const [txnId, setTxnId] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleCheckout = async () => {
    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      setError("Please fill in all details including address")
      return
    }

    setLoading(true)
    setError("")

    // Smoothly open UPI Modal
    setTimeout(() => {
      setLoading(false)
      setShowUPIModal(true)
    }, 800)
  }

  const handleFinalSubmit = async () => {
    if (!txnId || txnId.length < 8) {
      setError("Please enter a valid UPI Transaction ID to confirm payment")
      return
    }

    setLoading(true)
    // Here we would ideally save the order with the Txn ID
    setTimeout(() => {
      router.push(`/checkout/success?manual=true&txnid=${txnId}`)
    }, 2000)
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
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-[#4A3728]/40 mt-6">
                  <Smartphone size={14} />
                  <span>UPI Payment Powered by HDFC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPI Payment Modal */}
        {showUPIModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-[#F3E8E2] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
              {/* Close Button */}
              <button
                onClick={() => setShowUPIModal(false)}
                className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full text-[#1A0F0A] transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10 text-center">
                <div className="w-16 h-16 bg-[#D98C8C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12">
                  <Smartphone className="text-[#D98C8C]" size={32} />
                </div>

                <h2 className="text-3xl font-serif text-[#1A0F0A] mb-2">Pay via UPI</h2>
                <p className="text-[#4A3728]/60 text-sm mb-8 italic">Scan QR or choose your preferred app</p>

                {/* QR Code Section */}
                <div className="relative w-56 h-56 mx-auto bg-white p-4 rounded-[2rem] shadow-inner mb-8 border-4 border-white">
                  <Image
                    src="/payments/upi-qr.jpg"
                    alt="UPI QR Code"
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="text-[#1A0F0A] font-serif text-2xl mb-10">
                  Total: <span className="text-[#D98C8C]">₹{totalPrice.toFixed(2)}</span>
                </div>

                {/* UPI App Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <a
                    href={`upi://pay?pa=yourupiid@upi&pn=FlabbergasterBakes&am=${totalPrice.toFixed(2)}&cu=INR`}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-[#E5D5CB] hover:border-[#D98C8C] hover:bg-[#D98C8C]/5 transition-all group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="font-bold text-[#4A3728]/40 group-hover:text-[#D98C8C]">GPay</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A3728]">Google Pay</span>
                  </a>
                  <a
                    href={`upi://pay?pa=yourupiid@upi&pn=FlabbergasterBakes&am=${totalPrice.toFixed(2)}&cu=INR`}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-[#E5D5CB] hover:border-[#D98C8C] hover:bg-[#D98C8C]/5 transition-all group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="font-bold text-[#4A3728]/40 group-hover:text-[#D98C8C]">PhPe</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A3728]">PhonePe</span>
                  </a>
                </div>

                {/* Transaction ID Section */}
                <div className="space-y-4 pt-8 border-t border-[#E5D5CB]">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#D98C8C] block">
                    Enter UPI Transaction ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={txnId}
                      onChange={(e) => setTxnId(e.target.value)}
                      placeholder="12 digit Ref Number"
                      className="w-full bg-white border border-[#E5D5CB] rounded-xl px-4 py-4 focus:outline-none focus:border-[#D98C8C] transition-colors text-center font-mono tracking-widest"
                    />
                    {txnId.length >= 12 && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleFinalSubmit}
                    disabled={loading || txnId.length < 8}
                    className="w-full bg-[#1A0F0A] text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#D98C8C] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                    <span>Complete Order</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
