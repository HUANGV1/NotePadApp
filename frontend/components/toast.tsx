"use client"

import { Check, X, AlertCircle } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
        ${
          type === "success"
            ? "bg-accent/10 border-accent text-accent"
            : "bg-destructive/10 border-destructive text-destructive"
        }
      `}
      >
        {type === "success" ? (
          <Check className="w-5 h-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
        )}
        <span className="font-medium text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 p-1 hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
