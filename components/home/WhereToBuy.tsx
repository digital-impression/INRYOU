import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Pin } from "@/components/ui/icons";
import { retailerCount, cityCount } from "@/lib/retailers";

// A few headline cities as quick entry points
const cities = ["Antwerpen", "Gent", "Brussel", "Leuven", "Brugge", "Hasselt"];

/**
 * Deliberately a low-key band rather than a rounded feature card: this is
 * useful information on the way to the checkout, not a second closing CTA
 * competing with the real one below the reviews.
 */
export function WhereToBuy() {
  return (
    <section className="border-y border-charcoal/10 bg-cream-deep">
      <div className="container-px mx-auto max-w-7xl py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-charcoal ring-1 ring-charcoal/10">
                <Pin className="h-4 w-4 text-orange-deep" />
                {retailerCount}+ verkooppunten · {cityCount} steden
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance display-3">
                Ook gewoon{" "}
                <span className="accent text-orange-deep">om de hoek.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="measure mt-3 text-pretty text-ink">
                Vind INRYOU in de winkel of horecazaak bij jou in de buurt — of
                laat het gewoon thuisbezorgen.
              </p>
            </Reveal>
          </div>

          <div className="lg:justify-self-end">
            <Reveal delay={2}>
              <div className="flex flex-wrap gap-2.5">
                {cities.map((c) => (
                  <Link
                    key={c}
                    href="/waar-te-koop"
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal ring-1 ring-charcoal/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange hover:text-white hover:ring-orange"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={3}>
              <Link
                href="/waar-te-koop"
                className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-medium text-charcoal"
              >
                Bekijk alle verkooppunten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
