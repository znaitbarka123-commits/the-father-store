"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Menu } from "lucide-react"
import { useCart } from "./cart-context"

export function SiteHeader() {
  const { open, count } = useCart()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/60 border-b border-border/50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <button className="lg:hidden text-foreground/80 hover:text-gold transition-colors" aria-label="Menu">
          <Menu className="size-5" />
        </button>

        <nav className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em] text-foreground/70">
          <a href="#atelier" className="hover:text-gold transition-colors">Atelier</a>
          <a href="#collection" className="hover:text-gold transition-colors">Collection</a>
          <a href="#heritage" className="hover:text-gold transition-colors">Heritage</a>
        </nav>

        <a href="#" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="font-serif text-2xl tracking-[0.35em] text-foreground">
            THE&nbsp;FATHER
          </span>
          <span className="text-[9px] uppercase tracking-[0.5em] text-gold mt-0.5">EST · MCMLXXII</span>
        </a>

        <div className="flex items-center gap-6">
          <span className="hidden lg:inline text-[11px] uppercase tracking-[0.28em] text-foreground/70 hover:text-gold cursor-pointer transition-colors">
            Account
          </span>
          <button
            onClick={open}
            className="relative flex items-center gap-2 text-foreground/80 hover:text-gold transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-gold text-[10px] font-medium text-charcoal"
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  )
}
