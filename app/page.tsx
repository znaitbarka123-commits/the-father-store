import { CartProvider } from "@/components/cart-context"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Manifesto } from "@/components/manifesto"
import { ProductGrid } from "@/components/product-grid"
import { Heritage } from "@/components/heritage"
import { SiteFooter } from "@/components/site-footer"
import { CartSidebar } from "@/components/cart-sidebar"
import { CheckoutModal } from "@/components/checkout-modal"

export default function Page() {
  return (
    <CartProvider>
      <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <SiteHeader />
        <Hero />
        <Manifesto />
        <ProductGrid />
        <Heritage />
        <SiteFooter />
        <CartSidebar />
        <CheckoutModal />
      </main>
    </CartProvider>
  )
}
