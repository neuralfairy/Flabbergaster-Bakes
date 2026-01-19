"use client"

import { NavbarRefined } from "@/components/NavbarRefined"
import { Clock, Award, Heart, Users, ArrowRight, Star, Quote, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AboutPage() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight
            const currentScroll = window.scrollY
            setScrollProgress((currentScroll / totalScroll) * 100)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    const gallery = [
        "/about_cupcake_1.png",
        "/product_pistachio.png",
        "/product_raspberry.png",
        "/product_caramel.png",
        "/product_wild_blueberry.png",
        "/product_matcha.png"
    ]

    return (
        <div className="relative min-h-screen bg-[#4A1D1D] text-[#F3E8E2]">
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-1 bg-[#D98C8C] z-[100] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            />

            <NavbarRefined />

            <main>
                {/* Hero Section - Editorial Style */}
                <section className="pt-48 pb-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#3D1414] to-[#4A1D1D]">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="overflow-hidden mb-6">
                                <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px] block animate-in slide-in-from-bottom-full duration-700">Atelier of Miniature Dreams</span>
                            </div>
                            <h1 className="text-7xl lg:text-9xl font-serif text-white leading-tight mb-12">
                                Our <span className="italic text-[#D98C8C]">Story</span>
                            </h1>
                            <div className="max-w-3xl relative">
                                <Quote className="absolute -top-8 -left-8 text-[#D98C8C]/20" size={64} />
                                <p className="text-2xl lg:text-3xl font-serif italic text-white/90 leading-relaxed">
                                    "We believe that a cupcake is more than just a treat; it is the silent protagonist of your most precious celebrations."
                                </p>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="flex flex-col items-center gap-4 mt-24 animate-bounce opacity-40">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Scroll</span>
                            <ChevronDown size={20} />
                        </div>
                    </div>
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D98C8C]/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-48 -left-20 w-[600px] h-[600px] bg-[#D98C8C]/5 blur-[120px] rounded-full pointer-events-none" />
                </section>

                {/* Our Journey - Alternating Layout */}
                <section className="py-32 px-6 bg-[#4A1D1D]">
                    <div className="max-w-7xl mx-auto space-y-40">
                        {/* Part 1 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="relative order-2 lg:order-1">
                                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                                    <Image
                                        src="/about_cupcake_1.png"
                                        alt="The beginning"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white p-6 rounded-full flex items-center justify-center text-center shadow-xl rotate-12">
                                    <span className="font-serif text-lg leading-tight text-[#1A0F0A]">Mouth Bursting<br /><span className="text-[#D98C8C] font-bold">Flavors</span></span>
                                </div>
                            </div>
                            <div className="space-y-8 order-1 lg:order-2">
                                <div className="space-y-4">
                                    <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">The Beginning</span>
                                    <h2 className="text-5xl lg:text-7xl font-serif text-white leading-tight">A Vision for <br /><span className="italic">Boutique Baking.</span></h2>
                                </div>
                                <p className="text-white/70 text-lg leading-relaxed font-serif italic">
                                    Flabbergaster Bakes started with a simple belief: that every cupcake should be a small work of art. What began as a passion project in a cozy kitchen has blossomed into a boutique dedicated to creating memorable moments, one cupcake at a time.
                                </p>
                            </div>
                        </div>

                        {/* Part 2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">The Craft</span>
                                    <h2 className="text-5xl lg:text-7xl font-serif text-white leading-tight">The Art of <br /><span className="italic">The Whisk.</span></h2>
                                </div>
                                <p className="text-white/70 text-lg leading-relaxed font-serif italic">
                                    We believe in the power of quality ingredients and careful craftsmanship. Each cupcake is made fresh daily with premium ingredients, thoughtful flavor combinations, and attention to every detail—from the perfect crumb to the final swirl of frosting.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <div className="text-[#D98C8C]"><Star size={24} fill="currentColor" /></div>
                                        <h4 className="font-serif text-xl">Premium Quality</h4>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">In every bite</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[#D98C8C]"><Heart size={24} fill="currentColor" /></div>
                                        <h4 className="font-serif text-xl">Made with Love</h4>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">100% Handcrafted</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                                    <Image
                                        src="/product_cookies.png"
                                        alt="Our craft"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white p-6 rounded-full flex items-center justify-center text-center shadow-xl -rotate-12">
                                    <span className="font-serif text-lg leading-tight text-[#1A0F0A] italic">Zero Artificial<br />Additives</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* The Atelier Gallery */}
                <section className="py-32 px-6 bg-[#4A1D1D]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-24 space-y-4">
                            <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">Visual Symphony</span>
                            <h2 className="text-5xl lg:text-7xl font-serif text-white">Recent <span className="italic">Creations</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
                            {gallery.map((src, idx) => (
                                <div key={src} className="group relative">
                                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#3D1414]">
                                        <Image
                                            src={src}
                                            alt="Cupcake creation"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#D98C8C] rounded-full flex items-center justify-center text-white font-serif text-xs shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        {idx + 1}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-32 text-center">
                            <Link href="/menu" className="group relative inline-flex items-center gap-6 px-12 py-6 bg-white text-[#1A0F0A] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                                <span className="relative z-10 uppercase tracking-[0.3em] font-bold text-xs">Explore Full Collection</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                                <div className="absolute inset-0 bg-[#D98C8C] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-32 px-6 border-t border-white/5 bg-[#3D1414]">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <p className="font-script text-7xl text-white mb-4">Flabbergaster Bakes</p>
                    <p className="text-[#D98C8C] text-sm font-bold tracking-[0.6em] uppercase mb-16">The Art of Fine Baking</p>

                    <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-8 text-[10px] font-bold uppercase tracking-[0.4em]">
                        <Link href="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
                        <Link href="/menu" className="text-white/40 hover:text-white transition-colors">Selection</Link>
                        <Link href="/about" className="text-white transition-colors">Atelier</Link>
                        <Link href="/contact" className="text-white/40 hover:text-white transition-colors">Concierge</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
