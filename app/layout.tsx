import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script" })

export const metadata: Metadata = {
  title: "Flabbergaster Bakes - Handcrafted Designer Cupcakes",
  description:
    "Delightfully handcrafted designer cupcakes made with fresh ingredients. Perfect for celebrations, weddings, and special moments!",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} font-sans antialiased bg-[#F3E8E2] text-[#4A3728]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
