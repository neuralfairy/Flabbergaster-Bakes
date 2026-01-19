"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export function AboutSectionRefined() {
    const [bgIndex, setBgIndex] = useState(0)
    const [imgIndex, setImgIndex] = useState(0)

    const backgrounds = [
        "bg-[#F3E8E2]", // Soft Cream
        "bg-[#EBDAD1]", // Slightly darker cream
        "bg-[#D9C4BA]", // Muted Tan
        "bg-[#C9A6A6]/20", // The requested "Slight Dark Pinkish" transition
    ]

    const images = [
        "/about_cupcake_1.png",
        "/product_chocolate.png",
        "/product_blueberry.png",
        "/product_mango.png"
    ]

    useEffect(() => {
        const bgInterval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % backgrounds.length)
        }, 5000)

        const imgInterval = setInterval(() => {
            setImgIndex((prev) => (prev + 1) % images.length)
        }, 4000)

        return () => {
            clearInterval(bgInterval)
            clearInterval(imgInterval)
        }
    }, [])

    return (
        <section id="about" className={`py-16 px-6 transition-colors duration-[3000ms] ease-in-out ${backgrounds[bgIndex]} relative overflow-hidden`}>
            {/* Subtle floating patterns */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    {/* Animated Image Box */}
                    <div className="relative">
                        <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.08)] bg-white/20 backdrop-blur-sm border border-white/30">
                            {images.map((src, idx) => (
                                <div
                                    key={src}
                                    className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${idx === imgIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-2"
                                        }`}
                                >
                                    <Image
                                        src={src}
                                        alt="Artisan Craftsmanship"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            {/* Interactive Glass Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A0F0A]/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Stats - Enhanced */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/90 backdrop-blur-xl p-6 rounded-[3rem] shadow-2xl animate-bounce duration-[4000ms] hidden lg:block border border-white">
                            <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-[#F3E8E2] to-[#EBDAD1] flex flex-col items-center justify-center p-4 text-center">
                                <span className="text-3xl font-serif text-[#1A0F0A] mb-1 font-bold">200+</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#D98C8C]">Flavours</span>
                                <div className="mt-2 w-8 h-[1px] bg-[#D98C8C]" />
                            </div>
                        </div>

                        {/* Decorative circle */}
                        <div className="absolute -top-10 -left-10 w-24 h-24 border border-[#D98C8C]/30 rounded-full animate-pulse" />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-[#D98C8C]" />
                                <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">The Flabbergaster Story</span>
                            </div>
                            <h2 className="text-6xl lg:text-8xl font-serif text-[#1A0F0A] leading-[1.1]">
                                Artistry in every<br />
                                <span className="italic relative inline-block text-[#D98C8C]/80">
                                    single crumb.
                                    <svg className="absolute -bottom-4 left-0 w-full" height="12" viewBox="0 0 100 12" preserveAspectRatio="none">
                                        <path d="M0,10 Q50,0 100,10" stroke="#D98C8C" strokeWidth="2" fill="none" opacity="0.3" />
                                    </svg>
                                </span>
                            </h2>
                        </div>

                        <p className="text-[#4A3728]/80 text-2xl leading-relaxed font-serif italic max-w-xl border-l-2 border-[#D98C8C]/20 pl-8">
                            "Born from a passion for perfection, Flabbergaster Bakes isn't just a bakery—it's an atelier of sugar and dreams. We don't just bake cupcakes; we craft miniature masterpieces that linger long after the last bite."
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-4">
                            <div className="group space-y-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <span className="text-[#D98C8C] font-bold text-xl font-serif">A</span>
                                </div>
                                <h4 className="font-serif text-2xl text-[#1A0F0A]">Master Artisans</h4>
                                <p className="text-sm text-[#4A3728]/60 leading-relaxed">Our pastry chefs bring decades of Michelin-starred experience to your kitchen table.</p>
                            </div>
                            <div className="group space-y-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <span className="text-[#D98C8C] font-bold text-xl font-serif">E</span>
                                </div>
                                <h4 className="font-serif text-2xl text-[#1A0F0A]">Ethical Sourcing</h4>
                                <p className="text-sm text-[#4A3728]/60 leading-relaxed">We partner with local farmers to ensure every berry and egg is of the highest pedigree.</p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Link href="/about" className="btn-premium group flex items-center gap-4 w-fit">
                                <span>Read Our Full Journey</span>
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                    →
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decorative blob */}
            <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-[#D98C8C]/10 blur-[150px] rounded-full pointer-events-none" />
        </section>
    )
}
