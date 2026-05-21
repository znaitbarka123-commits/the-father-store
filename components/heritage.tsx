"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "54", label: "Years in trade" },
  { value: "III", label: "Generations" },
  { value: "120+", label: "Hours per suit" },
  { value: "01", label: "Master cutter" },
]

export function Heritage() {
  return (
    <section id="heritage" className="relative py-24 lg:py-32 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold">
            — The House —
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-foreground leading-[1.05] text-balance">
            A name <span className="italic">whispered</span> across three generations.
          </h2>
          <div className="mt-8 space-y-5 text-foreground/65 text-base leading-relaxed">
            <p>
              We do not advertise. We do not chase trend. The Father has dressed
              senators, sons, and silent men since 1972 — and we have never, in five
              decades, accepted a client we did not first meet over an espresso.
            </p>
            <p className="text-foreground/50">
              Every garment is cut from a single bolt, basted by hand, and finished by
              the same craftsman who began it. There are no shortcuts. There is only
              the work.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="border-l-2 border-gold/60 pl-5"
              >
                <p className="font-serif text-4xl text-foreground">{s.value}</p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/50 mt-2">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden grain"
        >
          <img
            src="/hero.jpg"
            alt="The atelier in low light"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-3">
              Atelier · Palermo
            </p>
            <p className="font-serif text-2xl text-foreground italic">
              &ldquo;Patience is the cloth&apos;s first thread.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
