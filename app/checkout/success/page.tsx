"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { NavbarRefined } from "@/components/NavbarRefined"
import { CheckCircle, Package, ArrowRight } from "lucide-react"

function SuccessContent() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const [orderDetails, setOrderDetails] = useState<any>(null)

    useEffect(() => {
        // Clear cart after successful payment
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cart-storage')
        }
    }, [])

    return (
        <div className="relative min-h-screen bg-[#F3E8E2]">
            <NavbarRefined />

            <main className="pt-40 pb-32 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Success Animation */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                            <CheckCircle size={48} className="text-green-600" />
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-serif text-[#1A0F0A] mb-4">
                            Order Confirmed!
                        </h1>

                        <p className="text-xl text-[#4A3728]/70 font-serif italic max-w-xl mx-auto">
                            Thank you for your order. We've received your payment and will start preparing your delicious cupcakes right away!
                        </p>
                    </div>

                    {/* Order Details Card */}
                    <div className="bg-white/50 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl mb-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
                        <div className="flex items-center gap-4 mb-6">
                            <Package size={28} className="text-[#D98C8C]" />
                            <h2 className="text-2xl font-serif text-[#1A0F0A]">What's Next?</h2>
                        </div>

                        <div className="space-y-4 text-[#4A3728]/80">
                            <div className="flex items-start gap-4">
                                <span className="w-8 h-8 bg-[#D98C8C]/20 rounded-full flex items-center justify-center text-sm font-bold text-[#D98C8C] shrink-0">1</span>
                                <div>
                                    <h3 className="font-serif text-lg text-[#1A0F0A] mb-1">Order Confirmation</h3>
                                    <p className="text-sm">You'll receive an email confirmation shortly with your order details.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="w-8 h-8 bg-[#D98C8C]/20 rounded-full flex items-center justify-center text-sm font-bold text-[#D98C8C] shrink-0">2</span>
                                <div>
                                    <h3 className="font-serif text-lg text-[#1A0F0A] mb-1">Preparation</h3>
                                    <p className="text-sm">Our master bakers will handcraft your cupcakes with love and care.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="w-8 h-8 bg-[#D98C8C]/20 rounded-full flex items-center justify-center text-sm font-bold text-[#D98C8C] shrink-0">3</span>
                                <div>
                                    <h3 className="font-serif text-lg text-[#1A0F0A] mb-1">Delivery</h3>
                                    <p className="text-sm">Your order will be ready for pickup or delivery within 24-48 hours.</p>
                                </div>
                            </div>
                        </div>

                        {sessionId && (
                            <div className="mt-8 pt-8 border-t border-[#4A3728]/10">
                                <p className="text-sm text-[#4A3728]/60">
                                    <span className="font-bold">Order Reference:</span> {sessionId.slice(0, 20)}...
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/menu"
                            className="group flex items-center justify-center gap-3 bg-[#1A0F0A] text-white px-10 py-5 rounded-full hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest">Continue Shopping</span>
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>

                        <Link
                            href="/"
                            className="group flex items-center justify-center gap-3 bg-white/50 text-[#1A0F0A] px-10 py-5 rounded-full hover:bg-white transition-all duration-500 shadow-lg"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="relative min-h-screen bg-[#F3E8E2]">
                <NavbarRefined />
                <main className="pt-40 pb-32 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="animate-pulse">
                            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6" />
                            <div className="h-12 bg-[#E5D5CB]/30 rounded-full w-96 mx-auto mb-4" />
                            <div className="h-6 bg-[#E5D5CB]/20 rounded-full w-full max-w-xl mx-auto" />
                        </div>
                    </div>
                </main>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
}
