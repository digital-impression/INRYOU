"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { ArrowRight } from "@/components/ui/icons";
import { Splatter } from "@/components/ui/Splatter";
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
 * Each flavour throws its own colour across the hero — the splat behind the
 * can and the washes bleeding off the section edges change together.
 *
 * `splash` is an optional transparent cut-out (liquid, fruit, ice) laid over
 * the splat and behind the can.
 */
const flavors = [
  {
    name: "Cranberry",
    note: "Lichtzuur & verfrissend",
    img: "/images/can-cranberry.png",
    splash: null as string | null,
    paint: "#b23a4b",
    paintDeep: "#8b2836",
  },
  {
    name: "Ginger & Citrus",
    note: "Pittig & levendig",
    img: "/images/can-ginger-citrus.png",
    splash: null as string | null,
    paint: "#e07c3a",
    paintDeep: "#b85a20",
  },
];

// Fixed so server and client render the same markup.
const bubbles = [
  { l: 30, s: 11, o: 0.5, d: 11, delay: 0, x: 14 },
  { l: 38, s: 6, o: 0.4, d: 9, delay: 2.4, x: -10 },
  { l: 45, s: 15, o: 0.42, d: 13, delay: 1.1, x: 18 },
  { l: 53, s: 8, o: 0.55, d: 8.5, delay: 3.6, x: -8 },
  { l: 60, s: 11, o: 0.4, d: 12, delay: 0.7, x: 16 },
  { l: 67, s: 6, o: 0.55, d: 10, delay: 4.8, x: -14 },
  { l: 72, s: 14, o: 0.34, d: 14, delay: 2, x: 10 },
  { l: 35, s: 8, o: 0.46, d: 9.5, delay: 5.6, x: -16 },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % flavors.length), 5600);
    return () => clearInterval(t);
  }, []);

  const flavor = flavors[i];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep" />
        {/* Paint thrown past the edges of the section */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`${flavor.name}-wash`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Splatter
              seed={41}
              color={flavor.paint}
              opacity={0.09}
              arms={7}
              className="-left-[16%] -top-[34%] h-[760px] w-[760px]"
            />
            <Splatter
              seed={7}
              color={flavor.paintDeep}
              opacity={0.07}
              arms={5}
              className="-bottom-[42%] left-[24%] h-[560px] w-[560px]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <div className="container-px mx-auto grid max-w-7xl items-center gap-10 pb-16 pt-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div className="relative z-20 max-w-2xl">
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
            className="mt-5 display-hero"
          >
            <span className="block uppercase">Natuurlijke</span>
            <span className="block uppercase">balans,</span>
            <span className="accent block text-orange-deep">moeiteloos.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="measure mt-6 text-pretty text-lg leading-relaxed text-ink"
          >
            Echte vruchten, functionele mineralen, amper suiker. Alles wat je
            lekker vindt aan frisdrank — zonder de crash.
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
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
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

        {/* Stage — no frame. The splat is the shape, the can flies over it. */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative z-10 mx-auto h-[430px] w-full max-w-[520px] sm:h-[540px] lg:h-[620px] lg:max-w-none"
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={`${flavor.name}-splat`}
              initial={{ opacity: 0, scale: 0.94, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.06, rotate: 5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Splatter
                seed={23}
                color={flavor.paint}
                arms={9}
                className="left-[46%] top-1/2 h-[134%] w-[134%] -translate-x-1/2 -translate-y-1/2"
              />
              <Splatter
                seed={88}
                color={flavor.paintDeep}
                opacity={0.5}
                arms={6}
                className="left-[62%] top-[56%] h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2"
              />
            </motion.div>
          </AnimatePresence>

          {/* Carbonation, only where the paint is */}
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            {bubbles.map((b, n) => (
              <span
                key={n}
                className="animate-bubble absolute bottom-[10%] rounded-full bg-white"
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

          {flavor.splash && (
            <Image
              src={asset(flavor.splash)}
              alt=""
              fill
              priority
              sizes="(min-width:1024px) 560px, 90vw"
              className="pointer-events-none object-contain"
            />
          )}

          {/* The can */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="animate-float-slower">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={flavor.name}
                  initial={{ opacity: 0, y: 44, rotate: -10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, rotate: -7, scale: 1 }}
                  exit={{ opacity: 0, y: -44, rotate: 5, scale: 0.92 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={asset(flavor.img)}
                    alt={`INRYOU ${flavor.name} bruisende drank`}
                    width={316}
                    height={700}
                    priority
                    className="h-[380px] w-auto object-contain drop-shadow-[0_36px_44px_rgba(40,10,14,0.42)] sm:h-[490px] lg:h-[570px]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Flavour readout */}
          <div className="absolute bottom-0 left-0 z-30 flex items-end gap-5">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted">
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
                  <p className="mt-1.5 font-display text-2xl leading-none text-charcoal">
                    {flavor.name}
                  </p>
                  <p className="mt-1.5 text-sm text-ink">{flavor.note}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex shrink-0 gap-2 pb-2">
              {flavors.map((f, idx) => (
                <button
                  key={f.name}
                  onClick={() => setI(idx)}
                  aria-label={`Toon ${f.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === i ? "w-7 bg-charcoal" : "w-2 bg-charcoal/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
