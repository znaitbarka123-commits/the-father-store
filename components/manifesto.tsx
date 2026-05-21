"use client"

import { motion } from "framer-motion"

export function Manifesto() {
  return (
    <section id="atelier" className="relative py-32 lg:py-48 border-b border-border/40">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="inline-block text-[10px] uppercase tracking-[0.5em] text-gold mb-8"
        >
          — The Doctrine —
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.25] text-foreground/95 italic text-balance"
        >
          &ldquo;A man&apos;s suit is not what he wears.
          <br />
          It is the silence he commands when he enters a room.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-10 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.4em] text-foreground/60"
        >
          <span className="h-px w-10 bg-gold/60" />
          Vito A. — Master Cutter, 1947
          <span className="h-px w-10 bg-gold/60" />
        </motion.div>
      </div>
    </section>
  )
}
