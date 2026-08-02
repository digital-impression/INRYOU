"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { ArrowRight } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

/**
 * Drop a photograph at `public/images/hero-backdrop.jpg` and set this to
 * "/images/hero-backdrop.jpg" to use it as the panel behind the can.
 * While it is null the panel falls back to the crafted gradient below.
 */
const HERO_BACKDROP: string | null = null;

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const flavors = [
  {
    name: "Cranberry",
    note: "Lichtzuur & verfrissend",
    img: "/images/can-cranberry.png",
  },
  {
    name: "Ginger & Citrus",
    note: "Pittig & levendig",
    img: "/images/can-ginger-citrus.png",
  },
];

/**
 * What the can stands on. A studio sweep — warm paper curving from a lit wall
 * into a shadowed floor — not a graphic sun; the old radial burst behind the
 * product was doing the work a photograph should do.
 */
function Backdrop() {
  if (HERO_BACKDROP) {
    return (
      <Image
        src={asset(HERO_BACKDROP)}
        alt=""
        fill
        priority
        sizes="(min-width:1024px) 460px, 90vw"
        className="object-cover"
      />
    );
  }

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #faf2e9 0%, #f6e8dc 44%, #f1dcc9 66%, #e8cdb4 100%)",
        }}
      />
      {/* Light pooling on the floor of the sweep */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 34% at 50% 84%, rgba(255,255,255,0.55), transparent 72%)",
        }}
      />
      {/* Falloff into the corners keeps the panel from reading as flat paper */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 40%, transparent 45%, rgba(120,72,50,0.10) 100%)",
        }}
      />
    </>
  );
}

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % flavors.length), 4200);
    return () => clearInterval(t);
  }, []);

  const flavor = flavors[i];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep" />
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <div className="container-px mx-auto grid max-w-7xl items-center gap-14 pb-16 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-ink ring-1 ring-charcoal/10 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
            Functionele bruisende dranken
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance display-1"
          >
            Natuurlijke balans,
            <br />
            <span className="accent text-orange-deep">moeiteloos.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="measure mt-6 text-pretty text-lg leading-relaxed text-ink"
          >
            Een premium bruisende drank met echte vruchten, functionele
            mineralen en amper suiker. Alles wat je lekker vindt aan frisdrank —
            rustig, verfijnd, beter.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/shop" size="lg">
              Ontdek het assortiment
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/our-story" variant="outline" size="lg">
              Ons verhaal
            </ButtonLink>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <Stars rating={5} />
              <span className="text-sm text-ink">
                <span className="font-semibold text-charcoal">4,9/5</span> uit
                1.300+ beoordelingen
              </span>
            </div>
            <div className="h-8 w-px bg-charcoal/10" />
            <div className="text-sm text-ink">
              <span className="font-semibold text-charcoal">&lt; 2g</span> suiker
              · <span className="font-semibold text-charcoal">15 kcal</span>
            </div>
          </motion.div>
        </div>

        {/* Product panel — the can breaks out over the frame's bottom edge */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative z-10 mx-auto w-full max-w-[420px] lg:max-w-[460px]"
        >
          <div className="relative h-[400px] overflow-hidden rounded-[2.5rem] shadow-[0_50px_80px_-56px_rgba(56,22,26,0.55)] ring-1 ring-charcoal/[0.07] sm:h-[520px] lg:h-[580px]">
            <Backdrop />
            <div className="absolute inset-0 grain opacity-40" />

            {/* Contact shadow — the can reads as standing, not pasted on */}
            <div
              aria-hidden
              className="absolute bottom-[42px] left-1/2 h-6 w-[52%] -translate-x-1/2 rounded-[50%] bg-charcoal/25 blur-xl sm:bottom-[48px] sm:h-8"
            />

            <div className="absolute inset-x-0 bottom-[46px] flex justify-center sm:bottom-[52px]">
              <div className="animate-float-slower">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={flavor.name}
                    initial={{ opacity: 0, y: 26, rotate: -2.5, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -26, rotate: 2.5, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={asset(flavor.img)}
                      alt={`INRYOU ${flavor.name} bruisende drank`}
                      width={300}
                      height={640}
                      priority
                      className="h-[280px] w-auto object-contain drop-shadow-[0_26px_30px_rgba(60,23,27,0.28)] sm:h-[370px] lg:h-[420px]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Flavour card, synced to the can */}
          <div className="absolute -top-4 right-0 z-20 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgba(60,23,27,0.55)] ring-1 ring-charcoal/10 md:block lg:-right-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              Nu proeven
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={flavor.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mt-1 font-display text-lg leading-tight">
                  {flavor.name}
                </p>
                <p className="text-sm text-ink">{flavor.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex justify-center gap-2">
            {flavors.map((f, idx) => (
              <button
                key={f.name}
                onClick={() => setI(idx)}
                aria-label={`Toon ${f.name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === i ? "w-6 bg-orange" : "w-2 bg-charcoal/20"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
