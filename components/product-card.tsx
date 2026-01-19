"use client"

import type { Product } from "@/lib/products"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsAdding(true)
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || '{"items":[],"total":0}')

    // Add product to cart
    const existingItem = cart.items.find((item: any) => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.items.push({ product, quantity: 1 })
    }

    // Update total
    cart.total = cart.items.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0)
    localStorage.setItem("cart", JSON.stringify(cart))

    setIsAdding(false)
    router.push("/cart")
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-64 overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base">{product.name}</CardTitle>
            <CardDescription className="text-xs mt-1">{product.category}</CardDescription>
          </div>
          <div className="text-sm font-semibold text-primary">★ {product.rating}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-lg font-bold">₹{(product.price / 100).toFixed(0)}</span>
          <Button size="sm" onClick={handleAddToCart} disabled={isAdding} className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? "Adding..." : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
