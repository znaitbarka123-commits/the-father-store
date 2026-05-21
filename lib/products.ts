export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
}

export const products: Product[] = [
  {
    id: "don-corleone",
    name: "Il Padrino — Double-Breasted",
    category: "Bespoke Suit",
    price: 4850,
    image: "/product-1.jpg",
    description: "Hand-finished super 180s wool. Peak lapels, surgeon's cuffs.",
  },
  {
    id: "consigliere",
    name: "Consigliere Three-Piece",
    category: "Bespoke Suit",
    price: 5200,
    image: "/product-2.jpg",
    description: "Midnight navy with hand-stitched waistcoat.",
  },
  {
    id: "famiglia-formal",
    name: "La Famiglia Evening",
    category: "Black Tie",
    price: 1950,
    image: "/product-3.jpg",
    description: "Silk bow, mother-of-pearl studs, ivory poplin.",
  },
  {
    id: "soldato",
    name: "Soldato Overcoat",
    category: "Outerwear",
    price: 3400,
    image: "/product-4.jpg",
    description: "Cashmere blend. Hand-padded chest, horn buttons.",
  },
  {
    id: "oxford-nero",
    name: "Oxford Nero",
    category: "Footwear",
    price: 1280,
    image: "/product-5.jpg",
    description: "Goodyear-welted calfskin, hand-burnished patina.",
  },
  {
    id: "tempo-doro",
    name: "Tempo d'Oro",
    category: "Heritage",
    price: 6750,
    image: "/product-6.jpg",
    description: "18k gold pocket watch on Albert chain.",
  },
]
