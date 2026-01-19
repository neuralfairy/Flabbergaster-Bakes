"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { useState, useEffect } from "react"

export function NavbarRefined() {
    const totalItems = useCart((state) => state.getTotalItems())
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Home", href: "/#home" },
        { name: "Menu", href: "/#menu" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/#contact" },
    ]

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between gap-8">
                        {/* Main Navigation Container */}
                        <div className={`
                            flex-1 flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500
                            ${isScrolled
                                ? 'bg-white/80 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40'
                                : 'bg-white/40 backdrop-blur-md border border-white/20'}
                        `}>
                            {/* Mobile Menu Button - Left Side */}
                            <button
                                className="lg:hidden text-[#1A0F0A] hover:text-[#D98C8C] transition-colors"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu size={22} />
                            </button>

                            {/* Desktop Navigation - Centered */}
                            <div className="hidden lg:flex flex-1 items-center justify-center gap-14">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-[#1A0F0A] font-bold tracking-[0.2em] text-[11px] uppercase hover:text-[#D98C8C] transition-all relative group"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#D98C8C] transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                ))}
                            </div>

                            {/* Spacer for desktop to balance layout */}
                            <div className="hidden lg:block w-6" />
                        </div>

                        {/* Separate Cart Button - Larger and More Prominent */}
                        <Link
                            href="/cart"
                            className={`
                                group relative flex items-center justify-center
                                w-16 h-16 rounded-full transition-all duration-500
                                ${isScrolled
                                    ? 'bg-[#D98C8C] shadow-[0_8px_32px_rgba(217,140,140,0.3)]'
                                    : 'bg-[#D98C8C] shadow-[0_12px_40px_rgba(217,140,140,0.4)]'}
                                hover:scale-110 hover:shadow-[0_16px_48px_rgba(217,140,140,0.5)]
                            `}
                        >
                            <ShoppingBag size={24} strokeWidth={2.5} className="text-white" />

                            {/* Enhanced Cart Badge */}
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 min-w-[28px] h-7 px-2 flex items-center justify-center rounded-full font-bold text-xs bg-white text-[#D98C8C] shadow-lg border-2 border-[#D98C8C] animate-in zoom-in duration-300">
                                    {totalItems}
                                </span>
                            )}

                            {/* Pulse animation when items exist */}
                            {totalItems > 0 && (
                                <span className="absolute inset-0 rounded-full bg-[#D98C8C] animate-ping opacity-20" />
                            )}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="absolute top-0 right-0 h-full w-[280px] bg-[#F3E8E2] p-8 shadow-2xl animate-in slide-in-from-right duration-500 ease-out">
                        <div className="flex items-center justify-between mb-12">
                            <span className="font-script text-3xl text-[#D98C8C]">Flabbergaster</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[#1A0F0A] hover:rotate-90 transition-all duration-300"
                            >
                                <X size={26} />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-serif text-[#1A0F0A] hover:text-[#D98C8C] transition-colors flex items-center justify-between group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                    <span className="w-2 h-2 rounded-full bg-[#D98C8C] scale-0 group-hover:scale-100 transition-transform" />
                                </Link>
                            ))}
                            <div className="mt-8 pt-8 border-t border-[#1A0F0A]/10 flex flex-col gap-6">
                                <Link
                                    href="/cart"
                                    className="text-sm font-bold tracking-widest uppercase text-[#1A0F0A] flex items-center justify-between hover:text-[#D98C8C] transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Your Cart
                                    <span className="bg-[#D98C8C] text-white px-3 py-1 rounded-full text-[10px] shadow-sm">{totalItems} items</span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
