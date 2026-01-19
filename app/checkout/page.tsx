"use client"

import { NavbarRefined } from "@/components/NavbarRefined"
import { useCart } from "@/lib/cart-store"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Truck, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
      // Simulate order processing
      setTimeout(() => {
        clearCart()
        router.push("/")
      }, 3000)
    }
  }

  if (items.length === 0 && step < 3) {
    router.push("/cart")
    return null
  }

  const totalPrice = getTotalPrice()

  return (
    <div className="relative min-h-screen">
      <NavbarRefined />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {step === 3 ? (
            // Success Message
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h1 className="text-5xl font-serif mb-4">Order Confirmed!</h1>
              <p className="text-[#8C7364] text-lg mb-8">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
              <p className="text-[#8C7364]">
                Redirecting to home page...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h1 className="text-5xl font-serif mb-6">Checkout</h1>

                {/* Progress Steps */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#4A3728]' : 'text-[#8C7364]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#4A3728] text-white' : 'bg-[#E5D5CB]'}`}>
                      1
                    </div>
                    <span className="font-medium">Shipping</span>
                  </div>
                  <div className="flex-1 h-px bg-[#E5D5CB]" />
                  <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#4A3728]' : 'text-[#8C7364]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#4A3728] text-white' : 'bg-[#E5D5CB]'}`}>
                      2
                    </div>
                    <span className="font-medium">Payment</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    {step === 1 ? (
                      <>
                        <div className="flex items-center gap-3 mb-6">
                          <Truck className="text-[#D98C8C]" size={24} />
                          <h2 className="text-2xl font-serif">Shipping Information</h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Email</label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Phone</label>
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <input
                              type="text"
                              required
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                            />
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">City</label>
                              <input
                                type="text"
                                required
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">State</label>
                              <input
                                type="text"
                                required
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">ZIP</label>
                              <input
                                type="text"
                                required
                                value={formData.zip}
                                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-6">
                          <CreditCard className="text-[#D98C8C]" size={24} />
                          <h2 className="text-2xl font-serif">Payment Information</h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Card Number</label>
                            <input
                              type="text"
                              required
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                            <input
                              type="text"
                              required
                              value={formData.cardName}
                              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Expiry Date</label>
                              <input
                                type="text"
                                required
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">CVV</label>
                              <input
                                type="text"
                                required
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex gap-4 mt-8">
                      {step === 2 && (
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-3 rounded-full font-medium border border-[#4A3728] text-[#4A3728] hover:bg-[#4A3728] hover:text-white transition-colors"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex-1 bg-[#4A3728] text-white py-3 rounded-full font-medium hover:bg-[#D98C8C] transition-colors"
                      >
                        {step === 1 ? 'Continue to Payment' : 'Place Order'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-32">
                    <h3 className="font-serif text-xl mb-4">Order Summary</h3>

                    <div className="space-y-3 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-[#8C7364]">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-medium">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
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
                          <span className="font-serif text-lg">Total</span>
                          <span className="font-serif text-xl">₹{totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="py-20 border-t border-[#E5D5CB]/50 text-center">
        <p className="font-script text-4xl text-[#D98C8C]">Flabbergaster Bakes</p>
      </footer>
    </div>
  )
}
