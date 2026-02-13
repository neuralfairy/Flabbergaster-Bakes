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
    setLoading(true)
    // Here we would ideally save the order with the Txn ID (if captured)
    setTimeout(() => {
      router.push(`/checkout/success?manual=true`)
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
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md transition-all duration-300 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowUPIModal(false)
            }}
          >
            <div 
              className="relative w-full max-w-sm bg-gradient-to-br from-[#F3E8E2] via-[#F8F0EA] to-[#F3E8E2] rounded-3xl sm:rounded-[3rem] shadow-2xl overflow-hidden border-2 border-white/40 transform transition-all duration-500 ease-out scale-100 animate-in zoom-in-95 my-auto"
              style={{ 
                animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowUPIModal(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 bg-white/70 hover:bg-white rounded-full text-[#1A0F0A] hover:text-[#D98C8C] transition-all duration-300 z-10 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="p-5 sm:p-6 md:p-7 text-center max-h-[90vh] overflow-y-auto">
                {/* Header Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#D98C8C]/20 to-[#D98C8C]/5 rounded-xl flex items-center justify-center mx-auto mb-4 transform rotate-12 shadow-inner">
                  <Smartphone className="text-[#D98C8C] transform -rotate-12" size={28} strokeWidth={2} />
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1A0F0A] mb-1 tracking-tight">
                  Pay via UPI
                </h2>
                <p className="text-[#4A3728]/70 text-xs sm:text-sm mb-5 font-light italic">
                  Scan QR code or choose your payment app
                </p>

                {/* QR Code Section with enhanced styling */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D98C8C]/10 to-transparent rounded-2xl blur-xl" />
                  <div className="relative w-full h-full bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border-2 border-white/80 hover:border-[#D98C8C]/30 transition-all duration-300">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <Image
                        src="/payments/upi-qr.jpg.jpeg"
                        alt="Flabbergaster Bakes UPI QR Code"
                        fill
                        className="object-cover"
                        priority
                        onError={(e) => {
                          // Hide image and show placeholder text
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="text-center p-4 z-10">
                        <div className="w-12 h-12 bg-[#D98C8C]/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-[#D98C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <p className="text-xs font-serif text-[#4A3728]">Scan to Pay</p>
                        <p className="text-[10px] text-[#4A3728]/60 mt-0.5">FlabbergasterBakes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Display */}
                <div className="mb-6 py-3 px-5 bg-white/60 rounded-xl inline-block shadow-lg">
                  <p className="text-[#4A3728]/60 text-[10px] uppercase tracking-widest mb-0.5">Amount to Pay</p>
                  <p className="text-[#1A0F0A] font-serif text-2xl sm:text-3xl font-bold">
                    ₹<span className="text-[#D98C8C]">{totalPrice.toFixed(2)}</span>
                  </p>
                </div>

                {/* UPI App Buttons - Enhanced Design */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <a
                    href={`upi://pay?pa=yourupiid@upi&pn=FlabbergasterBakes&am=${totalPrice.toFixed(2)}&cu=INR`}
                    className="group relative flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-2 border-[#E5D5CB] hover:border-[#D98C8C] hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D98C8C]/0 to-[#D98C8C]/0 group-hover:from-[#D98C8C]/5 group-hover:to-[#D98C8C]/10 transition-all duration-300" />
                    <div className="relative w-10 h-10 bg-[#4A3728]/5 group-hover:bg-[#4A3728]/10 rounded-lg flex items-center justify-center transition-all duration-300">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4285F4" />
                        <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#34A853" />
                        <path d="M12 17L22 12V7L12 12V17Z" fill="#FBBC04" />
                        <path d="M2 7V12L12 17V12L2 7Z" fill="#EA4335" />
                      </svg>
                    </div>
                    <span className="relative text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#4A3728] group-hover:text-[#D98C8C] transition-colors">
                      Google Pay
                    </span>
                  </a>
                  
                  <a
                    href={`upi://pay?pa=yourupiid@upi&pn=FlabbergasterBakes&am=${totalPrice.toFixed(2)}&cu=INR`}
                    className="group relative flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-2 border-[#E5D5CB] hover:border-[#D98C8C] hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D98C8C]/0 to-[#D98C8C]/0 group-hover:from-[#D98C8C]/5 group-hover:to-[#D98C8C]/10 transition-all duration-300" />
                    <div className="relative w-10 h-10 bg-[#5F259F]/5 group-hover:bg-[#5F259F]/10 rounded-lg flex items-center justify-center transition-all duration-300">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#5F259F" />
                        <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="relative text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#4A3728] group-hover:text-[#D98C8C] transition-colors">
                      PhonePe
                    </span>
                  </a>
                </div>

                {/* Transaction ID Section */}
                <div className="space-y-3">
                  <button
                    onClick={handleFinalSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#1A0F0A] to-[#2A1F1A] text-white py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest hover:from-[#D98C8C] hover:to-[#C97C7C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl disabled:hover:from-[#1A0F0A] disabled:hover:to-[#2A1F1A] active:scale-95 transform"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Check size={18} strokeWidth={2.5} />
                        <span>Complete Order</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#4A3728]/40">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                  </svg>
                  <span>Secure UPI Payment</span>
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
