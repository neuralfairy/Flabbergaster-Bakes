"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function HeroRefined() {
    const images = [
        "/hero_cupcake_4.png",
        "/hero_cupcake_1.jpg",
        "/hero_cupcake_2.jpg",
        "/hero_cupcake_3.jpg",
    ]

    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [images.length])

    return (
        <section id="home" className="relative h-screen w-full flex items-center overflow-hidden bg-[#F3E8E2]">
            {/* Left Side Content - Dedicated Space for Text */}
            <div className="relative z-20 w-full lg:w-1/2 h-full flex items-center justify-center px-6 lg:px-20 pt-20">
                <div className="max-w-xl">
                    <div className="overflow-hidden mb-8">
                        <div className="flex items-center gap-4 animate-in slide-in-from-bottom-full duration-700">
                            <span className="w-12 h-[1px] bg-[#D98C8C]" />
                            <span className="text-[#D98C8C] font-bold tracking-[0.4em] uppercase text-[10px]">
                                Boutique Cupcake Collection
                            </span>
                        </div>
                    </div>

                    <h1 className="title-script text-[#1A0F0A] mb-8 leading-[0.8] animate-in fade-in slide-in-from-left-20 duration-1000 delay-100">
                        Flabbergaster<br />
                        <span className="italic ml-8">Bakes</span>
                    </h1>

                    <p className="font-serif text-xl lg:text-2xl text-[#2A1810]/70 mb-14 leading-relaxed italic font-medium max-w-lg animate-in fade-in slide-in-from-left-10 duration-1000 delay-300">
                        "Born from a passion for perfection, our luxury cupcakes are miniature masterpieces crafted to linger in your memory."
                    </p>

                    <div className="flex flex-wrap gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                        <Link href="#menu" className="btn-premium">
                            Explore Collection
                        </Link>
                        <Link href="#about" className="group flex items-center gap-4 text-[#1A0F0A] font-bold tracking-widest text-[10px] uppercase hover:text-[#D98C8C] transition-colors">
                            <span>Our Philosophy</span>
                            <div className="w-8 h-[1px] bg-[#1A0F0A] group-hover:w-12 group-hover:bg-[#D98C8C] transition-all" />
                        </Link>
                    </div>
                </div>

                {/* Vertical Decorative Text */}
                <div className="absolute left-10 bottom-20 hidden xl:block origin-left -rotate-90">
                    <span className="text-[10px] font-bold tracking-[1em] uppercase text-[#1A0F0A]/20">Est. Boutique MMXXIV</span>
                </div>
            </div>

            {/* Right Side - Featured Image with Editorial Container */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-10 lg:relative lg:block h-[120%] lg:h-[90%] -translate-y-[10%] lg:translate-y-0">
                <div className="relative w-full h-full lg:rounded-l-[10rem] overflow-hidden shadow-2xl border-l border-white/20">
                    {images.map((src, index) => (
                        <div
                            key={src}
                            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${index === currentImageIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 -rotate-3"
                                }`}
                        >
                            <Image
                                src={src}
                                alt={`Cupcake Creation ${index + 1}`}
                                fill
                                className="object-cover object-[center_35%]"
                                priority={index === 0}
                            />
                            {/* Sophisticated Image Shadow/Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F3E8E2]/40 via-transparent to-transparent z-10" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce z-40">
                <span className="text-[9px] uppercase tracking-[0.5em] text-[#1A0F0A] font-bold">Discover</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#1A0F0A] via-[#1A0F0A]/40 to-transparent" />
            </div>

            {/* Subtle background patterns */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D98C8C]/5 blur-[150px] rounded-full pointer-events-none" />
        </section>
    )
}
