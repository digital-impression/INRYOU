"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Orb, IconOrb } from "@/components/ui/Orb";
import { Heart, Check, Drop, Recycle, Globe, Sparkle } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

type Feature = {
  icon: typeof Heart;
  title: string;
  text: string;
  tone: string;
};

const left: Feature[] = [
  { icon: Heart, title: "Natuurlijk", text: "Echte ingrediënten", tone: "sage" },
  { icon: Check, title: "Minder suiker", text: "Minder dan 2g per blik", tone: "orange" },
  { icon: Drop, title: "Functioneel", text: "Mineralenbalans", tone: "cranberry" },
];

const right: Feature[] = [
  { icon: Recycle, title: "Recycleerbaar", text: "Volledig recycleerbaar blik", tone: "sage" },
  { icon: Globe, title: "Belgisch", text: "Lokaal gebrouwen", tone: "oxblood" },
  { icon: Sparkle, title: "Geen onzin", text: "Niets kunstmatigs", tone: "orange" },
];

function Feature({ f, align }: { f: Feature; align: "left" | "right" }) {
  return (
    <Reveal as="div">
      <div
        className={`flex items-center gap-4 ${
          align === "left" ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}
      >
        <IconOrb tone={f.tone} className="h-14 w-14">
          <f.icon className="h-7 w-7" strokeWidth={1.8} />
        </IconOrb>
        <div className="min-w-0">
          <p className="font-display text-xl leading-tight text-charcoal">
            {f.title}
          </p>
          <p className="text-sm text-muted">{f.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Rooted() {
  return (
    <section className="relative overflow-hidden bg-blush">
      <div className="container-px relative mx-auto max-w-7xl py-24 lg:py-32">
        <div className="relative">
          {/* Orb watermark behind the header */}
          <Orb
            tone="sunset"
            spin
            opacity={0.12}
            className="left-1/2 top-[-40px] h-[280px] w-[280px] -translate-x-1/2"
          />
          <Reveal>
            <h2 className="relative text-center font-normal uppercase tracking-[0.04em] text-charcoal display-2">
              <span>Geworteld in </span>
              <span className="accent mt-2 inline-block rounded-xl border-2 border-orange px-4 py-1 text-orange">
                betekenis
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-x-10 gap-y-10 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left column */}
          <div className="order-2 flex flex-col gap-10 lg:order-1">
            {left.map((f) => (
              <Feature key={f.title} f={f} align="left" />
            ))}
          </div>

          {/* Center can */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 mx-auto flex h-[300px] w-[190px] items-center justify-center lg:order-2 lg:h-[440px] lg:w-[260px]"
          >
            <Orb
              tone="sunset"
              breathe
              opacity={0.5}
              className="bottom-[12%] left-1/2 h-[240px] w-[240px] -translate-x-1/2 lg:h-[320px] lg:w-[320px]"
            />
            <Image
              src={asset("/images/can-cranberry.png")}
              alt="INRYOU Cranberry blik"
              width={260}
              height={560}
              className="animate-float-slow relative h-full w-auto object-contain drop-shadow-[0_30px_40px_rgba(56,22,26,0.28)]"
            />
          </motion.div>

          {/* Right column */}
          <div className="order-3 flex flex-col gap-10">
            {right.map((f) => (
              <Feature key={f.title} f={f} align="right" />
            ))}
          </div>
        </div>

        <Reveal delay={1}>
          <p className="mt-16 text-center text-muted">
            Met intentie gemaakt — beter voor jou en de planeet.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
