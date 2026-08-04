"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Botanical } from "@/components/ui/Botanical";
import { IconBadge, type BadgeTone } from "@/components/ui/IconBadge";
import { Heart, Check, Drop, Recycle, Globe, Sparkle } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

/**
 * Optional atmospheric photograph behind the panel. Drop a file at
 * `public/images/rooted-backdrop.jpg` and point this at it; it renders at low
 * opacity under the oxblood wash, so it reads as texture, not as a picture.
 */
const ROOTED_BACKDROP: string | null = null;

type Feature = {
  icon: typeof Heart;
  title: string;
  text: string;
  tone: BadgeTone;
};

const left: Feature[] = [
  { icon: Heart, title: "Natuurlijk", text: "Echte ingrediënten", tone: "sage" },
  { icon: Check, title: "Minder suiker", text: "Minder dan 2g per blik", tone: "orange" },
  { icon: Drop, title: "Functioneel", text: "Mineralenbalans", tone: "cranberry" },
];

const right: Feature[] = [
  { icon: Recycle, title: "Recycleerbaar", text: "Volledig recycleerbaar blik", tone: "sage" },
  { icon: Globe, title: "Belgisch", text: "Lokaal gebrouwen", tone: "cream" },
  { icon: Sparkle, title: "Geen onzin", text: "Niets kunstmatigs", tone: "orange" },
];

function Feature({ f, align }: { f: Feature; align: "left" | "right" }) {
  return (
    <Reveal as="div">
      <div
        className={`flex items-center gap-4 ${
          align === "left" ? "lg:flex-row-reverse lg:text-right" : ""
        }`}
      >
        <IconBadge tone={f.tone} surface="dark" className="h-12 w-12">
          <f.icon className="h-6 w-6" strokeWidth={1.6} />
        </IconBadge>
        <div className="min-w-0">
          <p className="font-display text-xl leading-tight text-cream">
            {f.title}
          </p>
          <p className="text-sm text-cream/60">{f.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Rooted() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      {/* Same rounded oxblood panel as the closing CTA — the brand's dark
          surface reused here so it recurs through the page instead of
          appearing once at the very bottom. */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-charcoal px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
        {ROOTED_BACKDROP && (
          <>
            <Image
              src={asset(ROOTED_BACKDROP)}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-charcoal/55" />
          </>
        )}
        <Parallax distance={64} className="pointer-events-none absolute inset-0 text-cream">
          <Botanical motif="berry" rotate={-16} className="-right-6 top-8 h-40 w-40 opacity-[0.1] lg:h-52 lg:w-52" />
          <Botanical motif="leaf" rotate={24} className="bottom-6 left-4 h-32 w-32 opacity-[0.08] lg:h-40 lg:w-40" />
        </Parallax>

        <div className="relative">
          <div className="text-center">
            <Reveal>
              <p className="eyebrow text-orange">Waar we voor staan</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 text-balance text-cream display-2">
                Geworteld in{" "}
                <span className="accent text-orange">betekenis.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="measure-center mt-5 text-pretty text-lg text-cream/70">
                Zes beloftes die we in elk blik waarmaken — van wat erin gaat
                tot wat ervan overblijft.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid items-center gap-x-10 gap-y-10 lg:grid-cols-[1fr_auto_1fr]">
            <div className="order-2 flex flex-col gap-8 lg:order-1">
              {left.map((f) => (
                <Feature key={f.title} f={f} align="left" />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-1 mx-auto flex h-[280px] w-[175px] items-center justify-center lg:order-2 lg:h-[380px] lg:w-[230px]"
            >
              <Image
                src={asset("/images/can-cranberry.png")}
                alt="INRYOU Cranberry blik"
                width={260}
                height={560}
                className="animate-float-slow relative h-full w-auto object-contain drop-shadow-[0_36px_44px_rgba(20,6,8,0.55)]"
              />
            </motion.div>

            <div className="order-3 flex flex-col gap-8">
              {right.map((f) => (
                <Feature key={f.title} f={f} align="right" />
              ))}
            </div>
          </div>

          <Reveal delay={1}>
            <p className="mt-12 text-center text-sm text-cream/50">
              Met intentie gemaakt — beter voor jou en de planeet.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
