"use client"

import { NavbarRefined } from "@/components/NavbarRefined"
import { useCart } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen">
        <NavbarRefined />

        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-[#D98C8C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-[#D98C8C]" size={40} />
            </div>
            <h1 className="text-4xl font-serif mb-4">Your Cart is Empty</h1>
            <p className="text-[#8C7364] mb-8">
              Looks like you haven't added any delicious treats yet!
            </p>
            <Link href="/menu" className="btn-premium">
              Browse Our Menu
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <NavbarRefined />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-serif mb-2">Shopping Cart</h1>
            <p className="text-[#8C7364]">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex gap-6"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-xl mb-1">{item.name}</h3>
                    <p className="text-[#8C7364] mb-4">₹{item.price.toFixed(2)} each</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-white/50 rounded-full px-4 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="hover:text-[#D98C8C] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:text-[#D98C8C] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#8C7364] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-serif text-2xl">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-[#8C7364] hover:text-red-500 transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20 sticky top-32">
                <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#8C7364]">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#E5D5CB] pt-4">
                    <div className="flex justify-between">
                      <span className="font-serif text-xl">Total</span>
                      <span className="font-serif text-2xl">₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-[#4A3728] text-white text-center py-3 rounded-full font-medium hover:bg-[#D98C8C] transition-colors mb-4"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/menu"
                  className="block w-full text-center py-3 rounded-full font-medium border border-[#4A3728] text-[#4A3728] hover:bg-[#4A3728] hover:text-white transition-colors"
                >
                  Continue Shopping
                </Link>
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
