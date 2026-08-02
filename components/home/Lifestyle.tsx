import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { IconOrb } from "@/components/ui/Orb";
import { ArrowRight, Sparkle, Leaf, Heart } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const points = [
  {
    icon: Sparkle,
    tone: "orange",
    title: "Rustige energie",
    text: "Een schone lift, zonder de crash.",
  },
  {
    icon: Leaf,
    tone: "sage",
    title: "Welzijn",
    text: "Mineralen die stil op de achtergrond werken.",
  },
  {
    icon: Heart,
    tone: "cranberry",
    title: "De filosofie",
    text: "Welzijn zou de makkelijke keuze moeten zijn.",
  },
];

export function Lifestyle() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed image — breaks the grid off the left edge on desktop */}
      <div className="relative mx-6 mt-6 h-[320px] overflow-hidden rounded-[2rem] sm:h-[420px] lg:absolute lg:inset-y-0 lg:left-0 lg:mx-0 lg:mt-0 lg:h-full lg:w-[46vw] lg:rounded-none">
        <Image
          src={asset("/images/can-in-hand.jpg")}
          alt="Een INRYOU Cranberry blik tegen een heldere lucht"
          fill
          sizes="(min-width:1024px) 46vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-cream/30" />
        <div className="absolute bottom-6 left-6 right-6 text-cream lg:max-w-xs">
          <p className="font-display text-2xl">Gemaakt voor elke dag</p>
          <p className="mt-1 text-sm text-cream/85">
            Van ochtendrituelen tot de reset in de namiddag.
          </p>
        </div>
      </div>

      {/* Content — offset to the right, overlapping the image edge */}
      <div className="container-px mx-auto max-w-7xl lg:grid lg:grid-cols-2">
        <div className="hidden lg:block" aria-hidden />
        <div className="py-16 lg:-ml-16 lg:py-32">
          <Reveal>
            <p className="eyebrow">Een manier van leven</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-3 text-balance text-charcoal display-2">
              Balans, waar het leven je ook{" "}
              <span className="accent text-cranberry">brengt.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="measure mt-5 text-pretty text-lg text-ink">
              INRYOU is geen detox of ontbering. Het is een kleine, dagelijkse
              upgrade — de rustige keuze die past in een vol, modern leven.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-7">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i} as="div">
                <div className="flex items-start gap-4">
                  <IconOrb tone={p.tone} className="h-12 w-12">
                    <p.icon className="h-6 w-6" strokeWidth={1.8} />
                  </IconOrb>
                  <div>
                    <p className="font-display text-xl text-charcoal">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-pretty text-ink">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={3}>
            <div className="mt-9">
              <ButtonLink href="/our-story" variant="outline">
                Ons verhaal
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
