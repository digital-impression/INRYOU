import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Splatter } from "@/components/ui/Splatter";
import { Parallax } from "@/components/ui/Parallax";
import { ArrowRight, Pin } from "@/components/ui/icons";
import { retailerCount, cityCount } from "@/lib/retailers";

// A few headline cities as quick entry points
const cities = ["Antwerpen", "Gent", "Brussel", "Leuven", "Brugge", "Hasselt"];

/**
 * Still lower in the hierarchy than the closing CTA — no big button, no card —
 * but on the dark ground, so it lands as its own moment rather than another
 * pale band between two pale sections.
 */
export function WhereToBuy() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-cream">
      {/* Depth: a dot field for the map read, paint drifting behind it, and a
          warm pool so the band isn't a flat rectangle of brown. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(251,247,239,0.9) 1.5px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <Parallax distance={56} className="pointer-events-none absolute inset-0">
        <Splatter
          seed={39}
          color="var(--color-orange)"
          opacity={0.2}
          arms={8}
          className="-right-[8%] -top-[40%] h-[520px] w-[520px]"
        />
        <Splatter
          seed={61}
          variant="burst"
          color="var(--color-cranberry)"
          opacity={0.2}
          arms={7}
          className="-bottom-[52%] left-[6%] h-[460px] w-[460px]"
        />
        <Splatter
          seed={28}
          variant="spray"
          color="var(--color-orange)"
          opacity={0.3}
          arms={8}
          className="left-[34%] top-[-18%] h-[280px] w-[280px]"
        />
      </Parallax>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 78% 30%, rgba(224,124,58,0.18), transparent 70%)",
        }}
      />

      <div className="container-px relative mx-auto max-w-7xl py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-medium tracking-wide text-cream ring-1 ring-cream/20">
                <Pin className="h-4 w-4 text-orange" />
                {retailerCount}+ verkooppunten · {cityCount} steden
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-cream display-3">
                Ook gewoon{" "}
                <span className="accent text-orange">om de hoek.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="measure mt-3 text-pretty text-cream/70">
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
                    className="rounded-full bg-cream/[0.07] px-4 py-2 text-sm font-medium text-cream/85 ring-1 ring-cream/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange hover:text-white hover:ring-orange"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={3}>
              <Link
                href="/waar-te-koop"
                className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream"
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
