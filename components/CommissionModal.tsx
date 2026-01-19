"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface CommissionModalProps {
    isOpen: boolean
    onClose: () => void
}

export function CommissionModal({ isOpen, onClose }: CommissionModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        message: ""
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsSubmitted(true)
        setIsSubmitting(false)

        // Reset form after 3 seconds and close modal
        setTimeout(() => {
            setFormData({ name: "", email: "", phone: "", location: "", message: "" })
            setIsSubmitted(false)
            onClose()
        }, 3000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-[#F3E8E2] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#1A0F0A] transition-all hover:rotate-90 duration-300"
                >
                    <X size={20} />
                </button>

                {!isSubmitted ? (
                    <div className="p-8 md:p-12">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <span className="w-8 h-[1px] bg-[#D98C8C]" />
                                <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">
                                    Private Commission
                                </span>
                                <span className="w-8 h-[1px] bg-[#D98C8C]" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-[#1A0F0A] mb-3">
                                Let's Create Something <span className="italic text-[#8B4C4C]">Special</span>
                            </h2>
                            <p className="text-[#4A3728]/70 font-serif italic text-sm md:text-base">
                                Share your vision with us, and we'll craft a bespoke masterpiece just for you.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#1A0F0A]/60">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-white/60 border border-white/40 rounded-2xl text-[#1A0F0A] placeholder:text-[#1A0F0A]/30 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]/50 focus:bg-white transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#1A0F0A]/60">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-white/60 border border-white/40 rounded-2xl text-[#1A0F0A] placeholder:text-[#1A0F0A]/30 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]/50 focus:bg-white transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#1A0F0A]/60">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-white/60 border border-white/40 rounded-2xl text-[#1A0F0A] placeholder:text-[#1A0F0A]/30 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]/50 focus:bg-white transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-[#1A0F0A]/60">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        required
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-white/60 border border-white/40 rounded-2xl text-[#1A0F0A] placeholder:text-[#1A0F0A]/30 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]/50 focus:bg-white transition-all"
                                        placeholder="City, State"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#1A0F0A]/60">
                                    Tell us about your vision (Optional)
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-white/60 border border-white/40 rounded-2xl text-[#1A0F0A] placeholder:text-[#1A0F0A]/30 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]/50 focus:bg-white transition-all resize-none"
                                    placeholder="Describe your custom cupcake vision, occasion, flavors, design preferences..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#1A0F0A] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </button>
                        </form>
                    </div>
                ) : (
                    // Success Message
                    <div className="p-12 md:p-16 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-4xl font-serif text-[#1A0F0A] mb-4">
                            Request Received!
                        </h3>
                        <p className="text-[#4A3728]/70 font-serif italic text-lg mb-2">
                            Thank you for your interest in our bespoke creations.
                        </p>
                        <p className="text-[#4A3728]/60 text-sm">
                            We will reach out to you shortly to discuss your custom commission.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
