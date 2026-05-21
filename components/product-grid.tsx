"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { products, type Product } from "@/lib/products"
import { useCart } from "./cart-context"

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add } = useCart()

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-card">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

        <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.4em] text-gold/90">
          N° {String(index + 1).padStart(2, "0")}
        </div>

        <button
          onClick={() => add(product)}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-4 right-4 size-12 grid place-items-center bg-gold text-charcoal opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-foreground"
        >
          <Plus className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold mb-2">
            {product.category}
          </p>
          <h3 className="font-serif text-xl text-foreground leading-tight">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm text-foreground/55 leading-relaxed max-w-xs">
            {product.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-serif text-lg text-foreground">{formatPrice(product.price)}</p>
        </div>
      </div>

      <button
        onClick={() => add(product)}
        className="mt-4 w-full py-3 border border-border/60 text-[11px] uppercase tracking-[0.3em] text-foreground/70 hover:border-gold hover:text-gold transition-colors"
      >
        Add to Cart
      </button>
    </motion.article>
  )
}

export function ProductGrid() {
  return (
    <section id="collection" className="relative py-24 lg:py-32 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">
              The Autumn Collection · MMXXVI
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground text-balance leading-[1]">
              Garments of consequence,
              <br />
              <span className="italic text-foreground/70">made for men of</span>{" "}
              <span className="italic text-gold">few words.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-foreground/55 leading-relaxed">
            Six pieces. Each one cut, basted and finished by a single craftsman in
            our Palermo atelier. No outsourcing. No compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
