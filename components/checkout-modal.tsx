"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X, Lock, Check } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-context"

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(n)
}

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clear } = useCart()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const shipping = items.length ? 75 : 0
  const total = subtotal + shipping

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        clear()
        setSuccess(false)
        closeCheckout()
      }, 3000)
    }, 2000)
  }

  if (!isCheckoutOpen) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-[#0a0a0a] border border-gold/20 w-full max-w-lg p-8 relative"
        >
          <button onClick={closeCheckout} className="absolute top-4 right-4 text-white/50 hover:text-gold">
            <X className="size-5" />
          </button>

          {success ? (
            <div className="text-center py-12">
              <Check className="size-16 text-gold mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-white uppercase tracking-widest">Order Confirmed</h2>
              <p className="text-white/60 mt-2 text-sm">We will contact you at znaitbarka123@gmail.com</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-serif text-gold mb-6 uppercase tracking-widest text-center">Checkout</h2>
              <form onSubmit={handlePayment} className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-4 bg-white/5 border border-white/10 text-white outline-none focus:border-gold" required />
                <input type="email" defaultValue="znaitbarka123@gmail.com" className="w-full p-4 bg-white/5 border border-white/10 text-white outline-none focus:border-gold" required />
                <input type="text" placeholder="Address in Morocco" className="w-full p-4 bg-white/5 border border-white/10 text-white outline-none focus:border-gold" required />
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-white/60 text-sm mb-2">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-gold">{formatPrice(total)}</span>
                  </div>
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Processing..." : <><Lock className="size-4" /> Secure Order</>}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
