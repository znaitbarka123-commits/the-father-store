"use client"

import { useCart } from "./cart-context"
import { motion } from "framer-motion"

const products = [
  {
    id: 1,
    name: "The Godfather Signature",
    price: 2500,
    category: "Bespoke Suit",
    image: "/suit-1.jpg",
  },
  {
    id: 2,
    name: "Majestic Charcoal Tuxedo",
    price: 1800,
    category: "Evening Wear",
    image: "/suit-2.jpg",
  },
  {
    id: 3,
    name: "Double-Breasted Classic",
    price: 2200,
    category: "Business Luxury",
    image: "/suit-3.jpg",
  },
  {
    id: 4,
    name: "Imperial Navy Blazer",
    price: 1200,
    category: "Casual Luxury",
    image: "/suit-4.jpg",
  }
]

export function ProductGrid() {
  const { addItem } = useCart()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
      {products.map((product) => (
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="group"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-charcoal mb-4 border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full bg-white/5 flex items-center justify-center text-gold/20 italic">
              The Father Tailoring
            </div>
            <button 
              onClick={() => addItem(product)}
              className="absolute bottom-4 left-4 right-4 z-20 bg-gold text-black py-3 font-bold translate-y-12 group-hover:translate-y-0 transition-transform duration-300 uppercase text-xs tracking-widest"
            >
              Add to Collection
            </button>
          </div>
          <h3 className="text-white font-serif text-lg">{product.name}</h3>
          <p className="text-gold font-medium mt-1">{product.price} MAD</p>
        </motion.div>
      ))}
    </div>
  )
}
