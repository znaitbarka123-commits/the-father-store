"use client"

import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from "react"
import type { Product } from "@/lib/products"

export type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
  isOpen: boolean
  isCheckoutOpen: boolean
  add: (product: Product) => void
  remove: (id: string) => void
  setQuantity: (id: string, q: number) => void
  clear: () => void
  open: () => void
  close: () => void
  openCheckout: () => void
  closeCheckout: () => void
  subtotal: number
  count: number
}

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const add = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const setQuantity = useCallback((id: string, q: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, q) } : i))
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items])
  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items])

  const value: CartState = {
    items,
    isOpen,
    isCheckoutOpen,
    add,
    remove,
    setQuantity,
    clear,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    openCheckout: () => {
      setIsOpen(false)
      setIsCheckoutOpen(true)
    },
    closeCheckout: () => setIsCheckoutOpen(false),
    subtotal,
    count,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
