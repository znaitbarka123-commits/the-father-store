"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X, Lock, Check } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-context"

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

type Method = "paypal" | "card"

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clear } = useCart()
  const [method, setMethod] = useState<Method>("paypal")
  const [success, setSuccess] = useState(false)

  const shipping = items.length ? 75 : 0
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => {
      clear()
      setSuccess(false)
      closeCheckout()
    }, 2400)
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-charcoal/85 backdrop-blur-md overflow-y-auto"
        >
          <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl bg-background border border-border/50 my-auto"
            >
              <button
                onClick={closeCheckout}
                aria-label="Close checkout"
                className="absolute top-5 right-5 z-10 text-foreground/60 hover:text-gold transition-colors"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>

              {success ? (
                <SuccessView total={total} />
              ) : (
                <div className="grid lg:grid-cols-[1.4fr_1fr]">
                  {/* Left: Form */}
                  <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border/40">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
                      Secure Checkout
                    </p>
                    <h2 className="mt-3 font-serif text-3xl text-foreground">
                      Complete the offer
                    </h2>
                    <p className="mt-2 text-sm text-foreground/55">
                      A handshake is binding. So is this.
                    </p>

                    {/* Method Toggle */}
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      <MethodTile
                        active={method === "paypal"}
                        onClick={() => setMethod("paypal")}
                        label="PayPal"
                        sub="Express · Trusted"
                      />
                      <MethodTile
                        active={method === "card"}
                        onClick={() => setMethod("card")}
                        label="Card"
                        sub="Visa · Amex · MC"
                      />
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                      <Section title="Contact">
                        <Field label="Full Name" placeholder="Michael Corleone" />
                        <Field
                          label="Email"
                          type="email"
                          placeholder="m.corleone@famiglia.com"
                        />
                      </Section>

                      <Section title="Delivery">
                        <Field label="Address" placeholder="Long Beach, NY" />
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="City" placeholder="New York" />
                          <Field label="Postal Code" placeholder="11561" />
                        </div>
                      </Section>

                      <AnimatePresence mode="wait">
                        {method === "paypal" ? (
                          <motion.div
                            key="paypal"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Section title="Payment">
                              <div className="border border-border/60 bg-card/50 p-6">
                                <div className="flex items-center justify-between">
                                  <PayPalLogo />
                                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                                    Buyer Protection
                                  </span>
                                </div>
                                <p className="mt-4 text-sm text-foreground/60 leading-relaxed">
                                  You will be redirected to PayPal to complete your purchase
                                  securely. Your account will be charged{" "}
                                  <span className="text-gold">{formatPrice(total)}</span>.
                                </p>
                              </div>
                            </Section>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="card"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Section title="Card Details">
                              <Field label="Card Number" placeholder="0000 0000 0000 0000" />
                              <div className="grid grid-cols-2 gap-4">
                                <Field label="Expiry" placeholder="MM / YY" />
                                <Field label="CVC" placeholder="123" />
                              </div>
                            </Section>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {method === "paypal" ? (
                        <button
                          type="submit"
                          className="w-full h-14 rounded-full bg-[#FFC439] text-[#003087] font-semibold tracking-wide hover:bg-[#F5BB30] transition-colors flex items-center justify-center gap-2"
                        >
                          <PayPalLogo small />
                          <span className="text-sm">Checkout</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full h-14 bg-gold text-charcoal text-[11px] uppercase tracking-[0.35em] font-medium hover:bg-gold-deep transition-colors flex items-center justify-center gap-2"
                        >
                          <Lock className="size-3.5" strokeWidth={2} />
                          Pay {formatPrice(total)}
                        </button>
                      )}

                      <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                        <Lock className="size-3" strokeWidth={1.5} />
                        Encrypted · Discreet · Final
                      </p>
                    </form>
                  </div>

                  {/* Right: Summary */}
                  <div className="p-8 lg:p-12 bg-card/30">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gold">
                      Order Summary
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-foreground">
                      {items.length} {items.length === 1 ? "Piece" : "Pieces"}
                    </h3>

                    <ul className="mt-8 space-y-5 max-h-[280px] overflow-y-auto pr-2">
                      {items.map((item) => (
                        <li key={item.id} className="flex gap-4">
                          <div className="size-16 shrink-0 bg-background overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-sm text-foreground leading-tight truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 mt-1">
                              Qty {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm text-foreground/80 tabular-nums">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-border/40 space-y-3 text-sm">
                      <Row label="Subtotal" value={formatPrice(subtotal)} />
                      <Row label="Shipping (White-Glove)" value={formatPrice(shipping)} />
                      <Row label="Estimated Tax" value={formatPrice(tax)} />
                    </div>

                    <div className="mt-6 pt-6 border-t border-gold/30 flex items-baseline justify-between">
                      <span className="text-[11px] uppercase tracking-[0.35em] text-foreground/70">
                        Total
                      </span>
                      <span className="font-serif text-3xl text-gold">
                        {formatPrice(total)}
                      </span>
                    </div>

                    <p className="mt-8 text-[11px] text-foreground/40 leading-relaxed border-l-2 border-gold/40 pl-4 italic">
                      &ldquo;I&apos;m gonna make him an offer he can&apos;t refuse.&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MethodTile({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean
  onClick: () => void
  label: string
  sub: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 border text-left transition-all ${
        active
          ? "border-gold bg-gold/5"
          : "border-border/60 bg-transparent hover:border-foreground/40"
      }`}
    >
      <p
        className={`font-serif text-base ${active ? "text-gold" : "text-foreground"}`}
      >
        {label}
      </p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 mt-1">
        {sub}
      </p>
      {active && (
        <span className="absolute top-3 right-3 size-4 grid place-items-center rounded-full bg-gold text-charcoal">
          <Check className="size-2.5" strokeWidth={3} />
        </span>
      )}
    </button>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
        {title}
      </p>
      {children}
    </div>
  )
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder ?? label}
        className="w-full bg-transparent border-b border-border/60 px-0 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold transition-colors"
      />
    </label>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-foreground/70">
      <span>{label}</span>
      <span className="tabular-nums text-foreground/90">{value}</span>
    </div>
  )
}

function PayPalLogo({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`font-bold tracking-tight ${small ? "text-base" : "text-2xl"}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <span style={{ color: "#003087" }}>Pay</span>
      <span style={{ color: "#009cde" }}>Pal</span>
    </span>
  )
}

function SuccessView({ total }: { total: number }) {
  return (
    <div className="p-12 lg:p-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto size-16 grid place-items-center rounded-full border-2 border-gold"
      >
        <Check className="size-8 text-gold" strokeWidth={1.5} />
      </motion.div>
      <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-gold">
        The deal is sealed
      </p>
      <h3 className="mt-3 font-serif text-3xl lg:text-4xl text-foreground">
        Welcome to the family.
      </h3>
      <p className="mt-4 text-sm text-foreground/60 max-w-sm mx-auto leading-relaxed">
        Your order of {formatPrice(total)} has been received. Our master tailor will
        be in touch within 24 hours to schedule your first fitting.
      </p>
    </div>
  )
}
