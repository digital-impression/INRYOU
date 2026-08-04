import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { Parallax } from "@/components/ui/Parallax";
import { Splat } from "@/components/ui/Splash";
import { Quote } from "@/components/ui/icons";
import { reviews } from "@/lib/reviews";
import { asset } from "@/lib/asset";

const flavorStyle: Record<
  string,
  { card: string; avatar: string; pill: string; field: string; paint: string; theme: string; can: string | null }
> = {
  Cranberry: {
    card: "bg-cranberry-soft/50",
    avatar: "bg-cranberry text-white",
    pill: "bg-cranberry/10 text-cranberry-deep",
    field: "bg-cranberry-soft",
    paint: "var(--color-cranberry)",
    theme: "cranberry",
    can: "/images/can-cranberry.png",
  },
  "Ginger & Citrus": {
    card: "bg-orange-soft/50",
    avatar: "bg-orange text-white",
    pill: "bg-orange/10 text-orange-deep",
    field: "bg-orange-soft",
    paint: "var(--color-orange)",
    theme: "ginger",
    can: "/images/can-ginger-citrus.png",
  },
  "Kweepeer & Vanille": {
    card: "bg-sage-soft/50",
    avatar: "bg-sage-deep text-white",
    pill: "bg-sage-deep/10 text-sage-deep",
    field: "bg-sage-soft",
    paint: "var(--color-sage-deep)",
    theme: "sage",
    can: null,
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const [featured, ...rest] = reviews;
  const fs = (f: string) => flavorStyle[f] ?? flavorStyle["Cranberry"];
  const hero = fs(featured.flavor);

  return (
    <section className="bg-cream-deep">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        {/* Header with aggregate */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">Geproefd. Geliefd.</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 max-w-xl text-balance text-charcoal display-2">
                Wat onze drinkers{" "}
                <span className="accent text-orange-deep">écht vinden.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2} as="div">
            <div className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 ring-1 ring-charcoal/5">
              <p className="font-display text-5xl leading-none text-charcoal">
                4,9
              </p>
              <div>
                <Stars rating={5} />
                <p className="mt-1 text-sm text-ink">
                  1.300+ beoordelingen
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 space-y-6">
          {/*
            The lead review is about a specific can, so the can is in it: the
            product carries the social proof instead of an initials bubble.
          */}
          <Reveal as="div">
            <div className="grid overflow-hidden rounded-[1.75rem] ring-1 ring-charcoal/5 lg:grid-cols-[0.42fr_0.58fr]">
              <div
                className={`relative flex min-h-[300px] items-center justify-center overflow-hidden lg:min-h-[380px] ${hero.field}`}
              >
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{ color: hero.paint }}
                >
                  <Splat seed={2} rotate={-8} className="-left-[8%] top-[4%] h-[72%] w-[72%] opacity-25" />
                  <Splat seed={6} flip className="bottom-[2%] right-[-6%] h-[58%] w-[58%] opacity-[0.18]" />
                </span>
                {hero.can && (
                  <Parallax distance={-22} className="relative">
                    <Image
                      src={asset(hero.can)}
                      alt={`INRYOU ${featured.flavor} blik`}
                      width={316}
                      height={700}
                      className="h-[240px] w-auto -rotate-6 object-contain drop-shadow-[0_26px_32px_rgba(56,22,26,0.35)] lg:h-[300px]"
                    />
                  </Parallax>
                )}
                <span className="absolute bottom-5 left-5 rounded-full bg-white/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-charcoal backdrop-blur">
                  {featured.flavor}
                </span>
              </div>

              <div className="flex flex-col justify-center bg-white/70 p-8 sm:p-10 lg:p-12">
                <Quote className="h-8 w-8 text-charcoal/15" />
                <p className="mt-3 font-display text-2xl leading-snug text-charcoal sm:text-3xl">
                  &ldquo;{featured.body}&rdquo;
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-lg ${hero.avatar}`}
                  >
                    {initials(featured.name)}
                  </span>
                  <div>
                    <p className="font-medium text-charcoal">{featured.name}</p>
                    <p className="text-sm text-muted">{featured.location}</p>
                  </div>
                  <div className="ml-auto">
                    <Stars rating={featured.rating} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Rest — masonry, uneven heights */}
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {rest.map((r) => (
              <Reveal key={r.name + r.title} as="div">
                <div className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-charcoal/5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-lg ${fs(r.flavor).avatar}`}
                    >
                      {initials(r.name)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {r.name}
                      </p>
                      <p className="text-xs text-muted">{r.location}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Stars rating={r.rating} size={14} />
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.65rem] font-medium ${fs(r.flavor).pill}`}
                    >
                      {r.flavor}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg leading-snug">{r.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
