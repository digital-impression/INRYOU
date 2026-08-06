import Link from "next/link";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Splat } from "@/components/ui/Splash";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Alle dranken" },
      { href: "/products/cranberry", label: "Cranberry" },
      { href: "/products/ginger-citrus", label: "Ginger & Citrus" },
      { href: "/products/quince-vanilla", label: "Kweepeer & Vanille" },
      { href: "/shop#bundle", label: "Proefpakket" },
    ],
  },
  {
    title: "Merk",
    links: [
      { href: "/our-story", label: "Ons verhaal" },
      { href: "/science", label: "De wetenschap" },
      { href: "/journal", label: "Journal" },
      { href: "/sustainability", label: "Duurzaamheid" },
    ],
  },
  {
    title: "Hulp",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/waar-te-koop", label: "Waar te koop" },
      { href: "/shipping", label: "Verzending & retour" },
      { href: "/cart", label: "Winkelmandje" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream/80">
      <span className="pointer-events-none absolute inset-0 text-cream">
        <Splat seed={4} rotate={-12} className="-right-20 -top-16 h-72 w-72 opacity-[0.07] lg:h-96 lg:w-96" />
        <Splat seed={2} flip className="-bottom-16 left-[8%] h-56 w-56 opacity-[0.05] lg:h-72 lg:w-72" />
      </span>
      <div className="container-px relative mx-auto max-w-7xl py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-sans text-2xl font-semibold tracking-[0.06em] text-cream">
              INRYOU
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.32em] text-cream/50">
              natural balance
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream/[0.07] px-3 py-1 text-[0.7rem] text-cream/70 ring-1 ring-cream/15">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
              Nog steeds aan het bruisen
            </p>
            <p className="mt-6 max-w-sm text-pretty text-cream/65">
              Functionele bruisende dranken voor dagelijkse balans. Echte
              vruchten, functionele mineralen, amper suiker — moeiteloos.
            </p>
            <div className="mt-8 max-w-sm">
              <p className="mb-3 text-sm font-medium text-cream">
                Schrijf je in bij INRYOU
              </p>
              <NewsletterForm variant="dark" />
              <p className="mt-3 text-xs text-cream/45">
                15% korting op je eerste bestelling. Uitschrijven wanneer je wil.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/75 transition hover:text-orange"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} INRYOU. Alle rechten voorbehouden.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="group inline-flex items-center gap-1.5 transition-colors hover:text-cream">
              <span className="h-1 w-1 scale-0 rounded-full bg-orange transition-transform duration-300 group-hover:scale-100" />
              Privacy
            </Link>
            <Link href="/terms" className="group inline-flex items-center gap-1.5 transition-colors hover:text-cream">
              <span className="h-1 w-1 scale-0 rounded-full bg-orange transition-transform duration-300 group-hover:scale-100" />
              Voorwaarden
            </Link>
            <Link href="/faq" className="group inline-flex items-center gap-1.5 transition-colors hover:text-cream">
              <span className="h-1 w-1 scale-0 rounded-full bg-orange transition-transform duration-300 group-hover:scale-100" />
              Ingrediënten & voeding
            </Link>
            <span className="text-cream/60">
              Gebrouwen in België · blik leeg? Bij het metaal.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
