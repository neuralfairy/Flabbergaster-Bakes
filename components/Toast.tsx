"use client"

import { useEffect, useState } from "react"
import { CheckCircle, X } from "lucide-react"

interface ToastProps {
    message: string
    show: boolean
    onClose: () => void
}

export function Toast({ message, show, onClose }: ToastProps) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    if (!show) return null

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 flex items-center gap-3 min-w-[300px]">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-green-600" size={20} />
                </div>
                <p className="flex-1 font-medium text-[#4A3728]">{message}</p>
                <button onClick={onClose} className="text-[#8C7364] hover:text-[#4A3728]">
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}
