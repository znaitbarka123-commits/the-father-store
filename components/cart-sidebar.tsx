"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

export function CartSidebar() {
  const { items, isOpen, close, remove, setQuantity, subtotal, openCheckout } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[460px] bg-background border-l border-border/60 flex flex-col"
          >
            <div className="flex items-center justify-between px-8 h-20 border-b border-border/50">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">The Family</p>
                <h2 className="font-serif text-2xl text-foreground mt-1">Your Cart</h2>
              </div>
              <button
                onClick={close}
                className="text-foreground/70 hover:text-gold transition-colors"
                aria-label="Close cart"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-10 text-center">
                  <ShoppingBag className="size-10 text-gold/60 mb-6" strokeWidth={1} />
                  <p className="font-serif text-xl text-foreground mb-2">An empty house</p>
                  <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
                    No piece has yet caught your eye. Step into the collection — the family
                    awaits its newest member.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 px-6 py-3 border border-border text-[11px] uppercase tracking-[0.3em] text-foreground/80 hover:border-gold hover:text-gold transition-colors"
                  >
                    View Collection
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-border/40">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 py-6 flex gap-5"
                    >
                      <div className="size-24 shrink-0 overflow-hidden bg-card">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <p className="text-[9px] uppercase tracking-[0.35em] text-gold">
                          {item.category}
                        </p>
                        <h3 className="font-serif text-base text-foreground mt-1 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-foreground/70 mt-1">
                          {formatPrice(item.price)}
                        </p>

                        <div className="mt-auto pt-3 flex items-center justify-between">
                          <div className="flex items-center border border-border/60">
                            <button
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              className="size-8 grid place-items-center text-foreground/70 hover:text-gold transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3" strokeWidth={1.5} />
                            </button>
                            <span className="w-8 text-center text-sm text-foreground tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              className="size-8 grid place-items-center text-foreground/70 hover:text-gold transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3" strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-destructive transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border/50 px-8 py-6 space-y-5 bg-card/40">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-foreground/60">
                    Subtotal
                  </span>
                  <span className="font-serif text-2xl text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-[11px] text-foreground/40 leading-relaxed">
                  Tailoring fittings and white-glove delivery calculated at checkout.
                </p>
                <button
                  onClick={openCheckout}
                  className="w-full py-4 bg-gold text-charcoal text-[11px] uppercase tracking-[0.35em] font-medium hover:bg-gold-deep transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={close}
                  className="w-full py-3 text-[11px] uppercase tracking-[0.3em] text-foreground/60 hover:text-gold transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
