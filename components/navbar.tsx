"use client"

import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🧁</span>
            </div>
            <span className="font-bold text-lg text-amber-900">Flabbergaster Bakes</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-amber-600 transition">
              Shop
            </Link>
            <Link href="/admin" className="text-sm hover:text-amber-600 transition">
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/" className="text-sm hover:text-amber-600 transition">
              Shop
            </Link>
            <Link href="/admin" className="text-sm hover:text-amber-600 transition">
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
