"use client"

import { NavbarRefined } from "@/components/NavbarRefined"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In production, this would send to an API
        alert("Thank you for your message! We'll get back to you soon.")
        setFormData({ name: "", email: "", phone: "", message: "" })
    }

    return (
        <div className="relative min-h-screen">
            <NavbarRefined />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#D98C8C] font-semibold tracking-[0.2em] uppercase text-xs">Contact Us</span>
                        <h1 className="text-5xl lg:text-6xl font-serif mt-4 mb-6">Get in Touch</h1>
                        <p className="text-[#8C7364] max-w-2xl mx-auto text-lg">
                            Have a question or special request? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                            <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                                    />
                                </div>

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
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5D5CB] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D98C8C] resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#4A3728] text-white py-3 rounded-full font-medium hover:bg-[#D98C8C] transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#D98C8C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-[#D98C8C]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl mb-2">Visit Us</h3>
                                        <p className="text-[#8C7364]">
                                            123 Baker Street<br />
                                            Sweet Town, ST 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#D98C8C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-[#D98C8C]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl mb-2">Call Us</h3>
                                        <p className="text-[#8C7364]">
                                            (555) 123-4567
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#D98C8C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-[#D98C8C]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl mb-2">Email Us</h3>
                                        <p className="text-[#8C7364]">
                                            hello@flabbergasterbakes.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#D98C8C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Clock className="text-[#D98C8C]" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl mb-2">Hours</h3>
                                        <p className="text-[#8C7364]">
                                            Monday - Friday: 8am - 6pm<br />
                                            Saturday: 9am - 5pm<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <h3 className="font-serif text-xl mb-4">Custom Orders</h3>
                                <p className="text-[#8C7364] mb-4">
                                    Planning something special? We love creating custom cakes for weddings,
                                    birthdays, and all of life's celebrations.
                                </p>
                                <p className="text-[#8C7364]">
                                    Please contact us at least 2 weeks in advance for custom orders.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-20 border-t border-[#E5D5CB]/50 text-center">
                <p className="font-script text-4xl text-[#D98C8C]">Flabbergaster Bakes</p>
            </footer>
        </div>
    )
}
