"use client"

import { refinedProducts, getProducts } from "@/lib/refined-products"
import { NavbarRefined } from "@/components/NavbarRefined"
import { ProductCardRefined } from "@/components/ProductCardRefined"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function MenuPage() {
    const [products, setProducts] = useState<any[]>([]) // Start with empty array
    const [loading, setLoading] = useState(true)

    // Fetch products from WordPress on component mount
    useEffect(() => {
        async function loadProducts() {
            setLoading(true)
            const wpProducts = await getProducts()
            setProducts(wpProducts)
            setLoading(false)
        }
        loadProducts()
    }, [])

    return (
        <div className="relative min-h-screen bg-[#F3E8E2]">
            <NavbarRefined />

            <main className="pt-40 pb-32 px-6 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D98C8C]/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E5D5CB]/20 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Back Button - Top Left */}
                    <div className="absolute top-0 left-0">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 text-[#1A0F0A]/60 hover:text-[#1A0F0A] transition-all duration-300"
                        >
                            <div className="p-1.5 rounded-full border border-[#1A0F0A]/10 group-hover:bg-[#1A0F0A] group-hover:text-white transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-16 space-y-6 pt-8 md:pt-0">
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-4">
                                <span className="w-8 h-[1px] bg-[#D98C8C]" />
                                <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">The Collection</span>
                                <span className="w-8 h-[1px] bg-[#D98C8C]" />
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-serif text-[#1A0F0A] leading-tight">
                                Our Full <span className="italic text-[#8B4C4C]">Menu</span>
                            </h1>
                            <p className="text-[#4A3728]/70 font-serif text-xl italic max-w-2xl mx-auto">
                                "Handcrafted with passion, served with grace. Explore our complete selection of artisanal cupcake curiosities."
                            </p>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                            {/* Loading Skeleton */}
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="relative animate-pulse">
                                    {/* Skeleton Background Number */}
                                    <span className="absolute -top-12 -left-6 font-serif text-9xl text-[#1A0F0A]/[0.02] leading-none pointer-events-none select-none">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Skeleton Card */}
                                    <div className="space-y-6">
                                        {/* Skeleton Image */}
                                        <div className="w-full aspect-[4/5] bg-[#E5D5CB]/30 rounded-[2.5rem]" />

                                        {/* Skeleton Text */}
                                        <div className="space-y-3 px-2">
                                            <div className="h-8 bg-[#E5D5CB]/30 rounded-full w-3/4 mx-auto" />
                                            <div className="h-4 bg-[#E5D5CB]/20 rounded-full w-full" />
                                            <div className="h-4 bg-[#E5D5CB]/20 rounded-full w-5/6 mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        // Group products by category
                        <>
                            {/* Regular Cupcakes Section */}
                            {products.filter(p => p.category !== "Signature Mousse Collection").length > 0 && (
                                <div className="mb-20">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                                        {products.filter(p => p.category !== "Signature Mousse Collection").map((product, index) => (
                                            <div key={product.id} className="relative animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 50}ms` }}>
                                                {/* Background Number */}
                                                <span className="absolute -top-12 -left-6 font-serif text-9xl text-[#1A0F0A]/[0.02] leading-none pointer-events-none select-none">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <ProductCardRefined product={product} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Signature Mousse Collection Section */}
                            {products.filter(p => p.category === "Signature Mousse Collection").length > 0 && (
                                <div className="mt-32">
                                    {/* Section Title */}
                                    <div className="flex flex-col items-center text-center mb-16 space-y-4">
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="w-12 h-[1px] bg-[#D98C8C]" />
                                            <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">Indulgent Delights</span>
                                            <span className="w-12 h-[1px] bg-[#D98C8C]" />
                                        </div>
                                        <h2 className="text-4xl lg:text-5xl font-serif text-[#1A0F0A] leading-tight">
                                            Signature <span className="italic text-[#8B4C4C]">Mousse Collection</span>
                                        </h2>
                                        <p className="text-[#4A3728]/70 font-serif text-lg italic max-w-2xl mx-auto">
                                            Silky smooth, delicately crafted mousse desserts
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                                        {products.filter(p => p.category === "Signature Mousse Collection").map((product, index) => (
                                            <div key={product.id} className="relative animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${index * 50}ms` }}>
                                                {/* Background Number */}
                                                <span className="absolute -top-12 -left-6 font-serif text-9xl text-[#1A0F0A]/[0.02] leading-none pointer-events-none select-none">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <ProductCardRefined product={product} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // No Products Found
                        <div className="text-center py-20">
                            <p className="font-serif text-2xl text-[#4A3728]/60 italic">
                                No cupcakes available at the moment. Please check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="py-20 border-t border-[#4A3728]/5 text-center bg-white/20">
                <p className="font-script text-5xl text-[#1A0F0A] mb-4">Flabbergaster Bakes</p>
                <p className="text-[#D98C8C] text-sm font-bold tracking-[0.4em] uppercase">Artisan Patisserie Atelier</p>
                <div className="flex items-center justify-center gap-10 mt-12 text-[10px] font-bold uppercase tracking-widest text-[#4A3728]/40">
                    <Link href="/" className="hover:text-[#1A0F0A] transition-colors">Home</Link>
                    <Link href="/menu" className="text-[#1A0F0A]">Menu</Link>
                    <Link href="/about" className="hover:text-[#1A0F0A] transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-[#1A0F0A] transition-colors">Contact</Link>
                </div>
            </footer>
        </div>
    )
}
