"use client"

import { refinedProducts } from "@/lib/refined-products"
import { NavbarRefined } from "@/components/NavbarRefined"
import { HeroRefined } from "@/components/HeroRefined"
import { ProductCardRefined } from "@/components/ProductCardRefined"
import { Sparkles, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { AboutSectionRefined } from "@/components/AboutSectionRefined"

export default function Home() {
  const featuredProducts = refinedProducts.slice(0, 3)

  return (
    <div className="relative min-h-screen">
      <NavbarRefined />

      <main>
        <HeroRefined />

        {/* Menu Section */}
        <section id="menu" className="py-12 px-6 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#D98C8C]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#E5D5CB]/20 blur-[100px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.03]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-[#D98C8C]" />
                  <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">The Collection</span>
                </div>
                <h2 className="text-6xl lg:text-8xl font-serif text-[#1A0F0A] leading-[0.9] tracking-tight">
                  Handcrafted<br />
                  <span className="italic relative inline-block">
                    Cupcakes
                    <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#D98C8C]/20" />
                  </span>
                </h2>
              </div>

              <div className="flex flex-col items-start md:items-end gap-10 max-w-sm">
                <p className="text-[#4A3728]/70 font-serif text-xl italic leading-relaxed text-left md:text-right">
                  "A curated selection of our most delicate cupcake blossoms, where every bite is a miniature celebration."
                </p>
                <Link href="/menu" className="group flex items-center gap-4 bg-[#1A0F0A] text-white px-10 py-5 rounded-full hover:bg-[#D98C8C] transition-all duration-500 shadow-xl hover:shadow-2xl">
                  <span className="text-sm font-bold uppercase tracking-widest">View Cupcake Menu</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="relative">
                  {/* Large background number for editorial feel */}
                  <span className="absolute -top-16 -left-8 font-serif text-[12rem] text-[#1A0F0A]/[0.03] leading-none pointer-events-none select-none">
                    0{index + 1}
                  </span>
                  <ProductCardRefined product={product} displayOnly={true} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutSectionRefined />

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">Reservations</span>
                  <h2 className="text-6xl lg:text-8xl font-serif text-[#1A0F0A]">Let's Create<br />Magic.</h2>
                </div>

                <div className="space-y-10">
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 bg-[#F3E8E2] rounded-2xl flex items-center justify-center text-[#4A3728] shrink-0 transform hover:rotate-12 transition-transform shadow-sm">
                      <MapPin size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="font-serif text-2xl mb-1">Our Flagship</h5>
                      <p className="text-[#4A3728]/60 text-lg italic">123 Baker Street, Mayfair</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 bg-[#F3E8E2] rounded-2xl flex items-center justify-center text-[#4A3728] shrink-0 transform hover:rotate-12 transition-transform shadow-sm">
                      <Phone size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="font-serif text-2xl mb-1">Private Line</h5>
                      <p className="text-[#4A3728]/60 text-lg italic">+44 20 7946 0123</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 bg-[#F3E8E2] rounded-2xl flex items-center justify-center text-[#4A3728] shrink-0 transform hover:rotate-12 transition-transform shadow-sm">
                      <Mail size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="font-serif text-2xl mb-1">Inquiries</h5>
                      <p className="text-[#4A3728]/60 text-lg italic">bespoke@flabbergaster.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[600px] w-full group overflow-hidden rounded-[3rem] shadow-2xl">
                {/* Background Image of the Storefront */}
                <Image
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop"
                  alt="Flabbergaster Bakes Atelier"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Darker Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Glassmorphism Address Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] text-white space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <h3 className="font-serif text-3xl mb-2">Our Atelier</h3>
                      <div className="flex items-center gap-3 text-white/80">
                        <MapPin size={18} className="text-[#D98C8C]" />
                        <span className="italic font-serif">123 Baker Street, Mayfair, London</span>
                      </div>
                    </div>

                    <a
                      href="https://maps.google.com/?q=123+Baker+Street+Mayfair+London"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#1A0F0A] px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D98C8C] hover:text-white transition-all duration-300 shadow-lg"
                    >
                      Get Directions
                    </a>
                  </div>

                  <div className="h-[1px] bg-white/10 w-full" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-1">
                      <p className="text-[#D98C8C] text-[10px] font-bold uppercase tracking-widest">Opening Hours</p>
                      <p className="font-serif italic text-white/80">Mon - Fri: 9am - 7pm</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#D98C8C] text-[10px] font-bold uppercase tracking-widest">Private Line</p>
                      <p className="font-serif italic text-white/80">+44 20 7946 0123</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#D98C8C] text-[10px] font-bold uppercase tracking-widest">Inquiries</p>
                      <p className="font-serif italic text-white/80">bespoke@flabbergaster.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Explore Button - Bottom Right */}
      <Link href="/menu" className="fixed bottom-12 right-12 z-40 group">
        <div className="relative">
          <div className="absolute -inset-4 bg-[#D98C8C]/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          <button className="relative flex items-center gap-4 bg-white/90 backdrop-blur-2xl border border-white px-10 py-5 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:scale-105 transition-all duration-500 group-hover:shadow-[0_25px_80px_rgba(0,0,0,0.15)] overflow-hidden">
            {/* Shine effect on button */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-1000 group-hover:left-[100%]" />

            <span className="font-serif text-xl text-[#1A0F0A]">Collection</span>
            <div className="w-12 h-12 bg-[#1A0F0A] rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-700 group-hover:rotate-[360deg]">
              <Sparkles size={22} className="text-[#D98C8C]" />
            </div>
          </button>
        </div>
      </Link>

      <footer className="py-32 px-6 border-t border-[#4A3728]/5 bg-[#F3E8E2]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="font-script text-7xl text-[#1A0F0A] mb-4">Flabbergaster Bakes</p>
          <p className="text-[#D98C8C] text-sm font-bold tracking-[0.6em] uppercase mb-16">The Art of Pure Fine Baking</p>

          <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-8 mb-20 text-xs font-bold uppercase tracking-[0.3em]">
            <Link href="#home" className="text-[#1A0F0A]/60 hover:text-[#1A0F0A] transition-colors">Home</Link>
            <Link href="#menu" className="text-[#1A0F0A]/60 hover:text-[#1A0F0A] transition-colors">Selection</Link>
            <Link href="#about" className="text-[#1A0F0A]/60 hover:text-[#1A0F0A] transition-colors">About</Link>
            <Link href="#contact" className="text-[#1A0F0A]/60 hover:text-[#1A0F0A] transition-colors">Contact</Link>
          </div>

          <div className="w-full h-[1px] bg-[#1A0F0A]/10 mb-12" />

          <p className="text-[#4A3728]/40 text-[10px] uppercase tracking-widest font-bold">
            &copy; Flabbergaster Bakes Atelier. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
