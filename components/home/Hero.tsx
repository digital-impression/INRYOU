"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { ArrowRight } from "@/components/ui/icons";
import { Orb } from "@/components/ui/Orb";
import { asset } from "@/lib/asset";

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
    accent: "#b23a4b",
  },
  {
    name: "Ginger & Citrus",
    note: "Pittig & levendig",
    img: "/images/can-ginger-citrus.png",
    accent: "#e07c3a",
  },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % flavors.length), 3200);
    return () => clearInterval(t);
  }, []);

  const flavor = flavors[i];

  return (
    <section className="relative overflow-hidden">
      {/* Warm rising-sun backdrop, echoing the logo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep" />
        <div
          className="absolute left-1/2 top-[42%] h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-70 blur-[20px]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(224,124,58,0.30) 0%, rgba(178,58,75,0.14) 38%, rgba(251,247,239,0) 68%)",
          }}
        />
        <div className="absolute inset-0 grain opacity-60" />
      </div>

      <div className="container-px mx-auto grid max-w-7xl items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-20">
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

        {/* Single can that cycles flavour */}
        <div className="relative z-10 flex h-[440px] items-center justify-center sm:h-[540px] lg:h-[620px]">
          {/* Signature orb — bold, ambient, bleeding off-canvas behind the can */}
          <Orb
            tone="sunset"
            rays
            spin
            breathe
            opacity={0.9}
            className="bottom-[2%] left-1/2 h-[440px] w-[440px] -translate-x-1/2 sm:h-[560px] sm:w-[560px] lg:left-[64%] lg:h-[720px] lg:w-[720px]"
          />

          <div className="animate-float-slow relative flex h-full w-[260px] items-end justify-center lg:w-[300px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={flavor.name}
                initial={{ opacity: 0, y: 30, rotate: -3, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, rotate: 3, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Image
                  src={asset(flavor.img)}
                  alt={`INRYOU ${flavor.name} bruisende drank`}
                  width={300}
                  height={640}
                  priority
                  className="h-[380px] w-auto object-contain drop-shadow-[0_44px_50px_rgba(60,23,27,0.42)] sm:h-[460px] lg:h-[540px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating flavour chip, synced to the can */}
          <div className="absolute bottom-6 right-0 z-20 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgba(60,23,27,0.55)] ring-1 ring-charcoal/10 md:block lg:-right-2">
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

          {/* Flavour dots */}
          <div className="absolute bottom-[-6px] left-1/2 flex -translate-x-1/2 gap-2 lg:left-[38%]">
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
        </div>
      </div>
    </section>
  );
}
