"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockProducts } from "@/lib/products"

export default function AdminPage() {
  const totalRevenue = mockProducts.reduce((sum, p) => sum + p.price, 0)
  const totalProducts = mockProducts.length

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalProducts}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Total Inventory Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹{(totalRevenue / 100).toFixed(0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(mockProducts.reduce((sum, p) => sum + p.rating, 0) / mockProducts.length).toFixed(1)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Product</th>
                      <th className="text-left py-3 px-4 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 font-semibold">Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProducts.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                        <td className="py-3 px-4 font-semibold">₹{(product.price / 100).toFixed(0)}</td>
                        <td className="py-3 px-4">★ {product.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
