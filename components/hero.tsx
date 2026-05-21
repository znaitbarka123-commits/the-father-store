"use client"

import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden grain">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="A bespoke suit illuminated in the half-light of an old atelier"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="text-[11px] uppercase tracking-[0.5em] text-gold">
            A House of Tailors · Sicilia
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl lg:text-8xl leading-[0.95] text-foreground max-w-5xl text-balance"
        >
          The cloth remembers
          <br />
          <span className="italic text-gold">the man who wears it.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-base lg:text-lg text-foreground/70 leading-relaxed"
        >
          Three generations of bespoke tailoring. Every stitch placed by hand.
          Every garment built to outlive its season — and, perhaps, its maker.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#collection"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gold text-charcoal text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-gold-deep transition-colors"
          >
            Enter the Atelier
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#heritage"
            className="inline-flex items-center justify-center px-8 py-4 border border-border/80 text-foreground/80 text-[11px] uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition-colors"
          >
            Our Heritage
          </a>
        </motion.div>
      </div>

      {/* bottom marquee line */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/40 bg-background/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-foreground/50">
          <span>Scroll · the family awaits</span>
          <span className="hidden md:inline">Bespoke · Made to Measure · Heritage</span>
          <span>N° 01 / 06</span>
        </div>
      </div>
    </section>
  )
}
