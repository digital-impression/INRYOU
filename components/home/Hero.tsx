"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { ArrowRight } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Each flavour owns the stage: the colour field, the glow behind the can and
 * the oversized word it stands in front of all change together.
 *
 * `splash` is an optional cut-out (liquid, fruit, ice) laid over the field and
 * behind the can — drop a transparent PNG in public/images and point at it.
 */
const flavors = [
  {
    name: "Cranberry",
    word: "CRANBERRY",
    note: "Lichtzuur & verfrissend",
    img: "/images/can-cranberry.png",
    splash: null as string | null,
    field:
      "linear-gradient(158deg, #c44d5e 0%, #a3323f 46%, #75232f 100%)",
    glow: "rgba(255,196,196,0.34)",
    ink: "rgba(255,233,233,0.17)",
  },
  {
    name: "Ginger & Citrus",
    word: "GINGER",
    note: "Pittig & levendig",
    img: "/images/can-ginger-citrus.png",
    splash: null as string | null,
    field:
      "linear-gradient(158deg, #ec9852 0%, #d1682c 46%, #9c4519 100%)",
    glow: "rgba(255,228,180,0.40)",
    ink: "rgba(255,247,230,0.20)",
  },
];

// Fixed so server and client render the same markup.
const bubbles = [
  { l: 12, s: 10, o: 0.5, d: 11, delay: 0, x: 14 },
  { l: 22, s: 6, o: 0.4, d: 9, delay: 2.4, x: -10 },
  { l: 31, s: 14, o: 0.45, d: 13, delay: 1.1, x: 20 },
  { l: 44, s: 7, o: 0.55, d: 8.5, delay: 3.6, x: -8 },
  { l: 57, s: 11, o: 0.42, d: 12, delay: 0.7, x: 16 },
  { l: 66, s: 5, o: 0.58, d: 10, delay: 4.8, x: -14 },
  { l: 74, s: 16, o: 0.36, d: 14, delay: 2, x: 10 },
  { l: 84, s: 8, o: 0.5, d: 9.5, delay: 5.6, x: -18 },
  { l: 92, s: 6, o: 0.45, d: 11.5, delay: 3, x: 8 },
  { l: 6, s: 9, o: 0.36, d: 12.5, delay: 6.2, x: 12 },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % flavors.length), 5200);
    return () => clearInterval(t);
  }, []);

  const flavor = flavors[i];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep" />
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <div className="container-px mx-auto grid max-w-7xl items-center gap-16 pb-16 pt-14 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:pb-24 lg:pt-20">
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

        {/* Stage — the can silhouetted against its own flavour, breaking the frame */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative z-10 mx-auto w-full max-w-[440px] pt-14 lg:max-w-[510px] lg:pt-20"
        >
          <div className="relative h-[440px] overflow-hidden rounded-[2.5rem] shadow-[0_50px_90px_-50px_rgba(56,22,26,0.65)] sm:h-[540px] lg:h-[600px]">
            <AnimatePresence mode="sync">
              <motion.div
                key={`${flavor.name}-field`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{ background: flavor.field }}
              />
            </AnimatePresence>

            {/* Halo the can stands in */}
            <div
              className="absolute inset-0 transition-[background] duration-700"
              style={{
                background: `radial-gradient(ellipse 58% 42% at 50% 46%, ${flavor.glow}, transparent 70%)`,
              }}
            />

            {/* Carbonation */}
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              {bubbles.map((b, n) => (
                <span
                  key={n}
                  className="animate-bubble absolute bottom-[-40px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  style={{
                    left: `${b.l}%`,
                    height: b.s,
                    width: b.s,
                    ["--b-o" as string]: b.o,
                    ["--b-d" as string]: `${b.d}s`,
                    ["--b-delay" as string]: `${b.delay}s`,
                    ["--b-x" as string]: `${b.x}px`,
                  }}
                />
              ))}
            </div>

            {/* Oversized flavour word — the can stands in front of it */}
            <div className="absolute inset-x-0 top-[38%] flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={flavor.word}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="whitespace-nowrap font-display text-[clamp(4.2rem,15vw,8.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.045em]"
                  style={{ color: flavor.ink }}
                >
                  {flavor.word}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Optional liquid / fruit cut-out, behind the can */}
            {flavor.splash && (
              <Image
                src={asset(flavor.splash)}
                alt=""
                fill
                priority
                sizes="(min-width:1024px) 500px, 90vw"
                className="pointer-events-none object-contain"
              />
            )}

            <div className="absolute inset-0 grain opacity-25" />

            {/* No contact shadow: the can is tilted and airborne over the
                field, so grounding it would fight the motion. */}

            {/* Flavour readout, on the field */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream/60">
                  Nu proeven
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={flavor.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-1.5 font-display text-2xl leading-none text-cream">
                      {flavor.name}
                    </p>
                    <p className="mt-1.5 text-sm text-cream/70">{flavor.note}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex shrink-0 gap-2 pb-1.5">
                {flavors.map((f, idx) => (
                  <button
                    key={f.name}
                    onClick={() => setI(idx)}
                    aria-label={`Toon ${f.name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === i ? "w-7 bg-cream" : "w-2 bg-cream/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* The can itself sits outside the panel so it can break the top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center">
            <div className="animate-float-slower">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={flavor.name}
                  initial={{ opacity: 0, y: 40, rotate: -6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotate: -5, scale: 1 }}
                  exit={{ opacity: 0, y: -40, rotate: 4, scale: 0.94 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={asset(flavor.img)}
                    alt={`INRYOU ${flavor.name} bruisende drank`}
                    width={316}
                    height={700}
                    priority
                    className="h-[390px] w-auto object-contain drop-shadow-[0_34px_42px_rgba(40,10,14,0.5)] sm:h-[480px] lg:h-[540px]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
