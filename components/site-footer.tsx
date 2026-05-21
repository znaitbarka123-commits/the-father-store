export function SiteFooter() {
  return (
    <footer className="relative bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="col-span-2">
          <p className="font-serif text-3xl tracking-[0.2em] text-foreground">
            THE FATHER
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.5em] text-gold">
            Est · MCMLXXII · Palermo
          </p>
          <p className="mt-6 max-w-sm text-sm text-foreground/55 leading-relaxed">
            Bespoke menswear, made by hand. Available by appointment only at our
            ateliers in Palermo, Milan, and New York.
          </p>
        </div>

        <FooterCol
          title="The House"
          links={["The Atelier", "Heritage", "Master Cutters", "Press"]}
        />
        <FooterCol
          title="Service"
          links={["Bespoke Process", "Fittings", "Care & Repair", "Contact"]}
        />
      </div>

      <div className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.4em] text-foreground/40">
          <p>© MMXXVI · The Father · All rights reserved</p>
          <p>
            By appointment · <span className="text-gold">+39 091 000 0000</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-sm text-foreground/65 hover:text-gold transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
