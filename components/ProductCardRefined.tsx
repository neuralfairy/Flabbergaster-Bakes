"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-store"
import { ShoppingBag, Plus } from "lucide-react"
import { useState } from "react"
import { Toast } from "./Toast"

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
}

interface ProductCardProps {
    product: Product
    displayOnly?: boolean // New prop for homepage display
}

export function ProductCardRefined({ product, displayOnly = false }: ProductCardProps) {
    const addItem = useCart((state) => state.addItem)
    const [showToast, setShowToast] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        })
        setShowToast(true)
    }

    const CardContent = (
        <div
            className="group relative flex flex-col items-center text-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container with sophisticated rounded corners */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 bg-[#F3E8E2] shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] group-hover:-translate-y-2">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Glass Overlay on Hover */}
                <div className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Quick Add Button - Only show if NOT display only */}
                {!displayOnly && (
                    <button
                        onClick={handleAddToCart}
                        className={`absolute bottom-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 hover:bg-[#1A0F0A] hover:text-white group/btn ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                        <Plus size={24} strokeWidth={1.5} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                    </button>
                )}

                {/* Price Tag - Only show if NOT display only */}
                {!displayOnly && (
                    <div className="absolute top-6 left-6 px-5 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
                        <span className="text-sm font-bold text-[#1A0F0A]">₹{product.price.toFixed(2)}</span>
                    </div>
                )}
            </div>

            {/* Text Content */}
            <div className="space-y-3 px-2">
                <div className="overflow-hidden">
                    <h3 className="font-serif text-2xl lg:text-3xl text-[#1A0F0A] leading-tight transition-transform duration-500 group-hover:text-[#D98C8C]">
                        {product.name}
                    </h3>
                </div>

                <p className="text-sm text-[#8C7364] font-medium italic opacity-70 leading-relaxed max-w-[240px] mx-auto">
                    {product.description}
                </p>

                {/* Only show "Add to Collection" if NOT display only */}
                {!displayOnly && (
                    <div className="pt-2">
                        <button
                            onClick={handleAddToCart}
                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A0F0A] hover:text-[#D98C8C] transition-colors inline-flex items-center gap-2 group/add"
                        >
                            <span>Add to Collection</span>
                            <div className="w-4 h-[1px] bg-[#1A0F0A] group-hover/add:w-8 group-hover/add:bg-[#D98C8C] transition-all" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )

    // If displayOnly, wrap in Link to menu page
    if (displayOnly) {
        return (
            <Link href="/menu" className="block cursor-pointer">
                {CardContent}
            </Link>
        )
    }

    // Otherwise, return normal card with toast
    return (
        <>
            {CardContent}
            <Toast
                message={`${product.name} added to cart!`}
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}
