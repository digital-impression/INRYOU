"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { Plus } from "@/components/ui/icons";
import { Splat } from "@/components/ui/Splash";
import { Bubbles } from "@/components/ui/Bubbles";
import { pricePerCan, type Product } from "@/lib/products";
import { asset } from "@/lib/asset";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const soon = !product.available;
  // Stable per product, so a card keeps its marks between renders.
  const seed = [...product.slug].reduce((n, c) => n + c.charCodeAt(0), 0) % 89;

  const media = (
    <div
      className="relative flex aspect-[4/5] items-center justify-center overflow-hidden"
      style={{ backgroundColor: product.accentSoft }}
    >
      <span
        className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        style={{ color: product.accent }}
      >
        <Splat seed={seed} rotate={-10} className="left-[-8%] top-[2%] h-[70%] w-[70%] opacity-30" />
        <Splat seed={seed + 3} flip rotate={14} className="bottom-[2%] right-[-6%] h-[58%] w-[58%] opacity-22" />
        
      </span>

      <Bubbles color={product.accent} count={7} scale={0.7} />

      {/* Badge */}
      <span className="absolute left-4 top-4 z-10 rounded-full bg-charcoal/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cream">
        {product.badge}
      </span>
      {soon && (
        <span className="absolute right-4 top-4 z-10 rounded-full border border-charcoal/20 bg-cream/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-charcoal">
          Binnenkort
        </span>
      )}

      {product.image ? (
        <>
          {/* Uniform ground shadow so every can sits consistently in-frame */}
          <span
            aria-hidden
            className="absolute bottom-[13%] left-1/2 h-4 w-[46%] -translate-x-1/2 rounded-[100%] bg-charcoal/25 blur-md"
          />
          <Image
            src={asset(product.image)}
            alt={`INRYOU ${product.name} blik`}
            width={320}
            height={640}
            className="relative z-[1] h-[84%] w-auto object-contain object-bottom drop-shadow-[0_18px_22px_rgba(56,22,26,0.28)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:-rotate-2 group-hover:scale-[1.04]"
          />
        </>
      ) : (
        // Coming-soon — a blurred can silhouette lit by the orb glow
        <>
          <Image
            src={asset("/images/can-cranberry.png")}
            alt=""
            aria-hidden
            width={320}
            height={640}
            className="relative z-[1] h-[82%] w-auto object-contain object-bottom opacity-40 blur-[3px] grayscale"
          />
          <div className="absolute inset-0 z-[2] flex flex-col items-center justify-end pb-[16%]">
            <span className="rounded-full bg-charcoal/85 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream">
              Binnenkort
            </span>
          </div>
          <span className="sr-only">INRYOU — binnenkort</span>
        </>
      )}
    </div>
  );

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white/70 ring-1 ring-charcoal/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-32px_rgba(32,29,26,0.35)]"
    >
      {soon ? media : <Link href={`/products/${product.slug}`}>{media}</Link>}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-none">{product.name}</h3>
        <p
          className="mt-2 text-xs font-semibold uppercase tracking-[0.14em]"
          style={{ color: product.accent }}
        >
          {product.tastingNotes.join(" · ")}
        </p>
        <p className="mt-3 text-pretty text-sm text-ink">
          {product.shortDescription}
        </p>

        <div className="mt-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted">vanaf</p>
            <p className="font-display text-xl leading-none">
              €{pricePerCan(product.price, product.packSize)}
              <span className="ml-1 text-xs font-normal text-muted">/blik</span>
            </p>
          </div>
          {soon ? (
            <span className="rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-medium text-charcoal/50">
              Binnenkort
            </span>
          ) : (
            <button
              onClick={() =>
                add({
                  slug: product.slug,
                  name: product.name,
                  flavorLine: product.flavorLine,
                  price: product.price,
                  image: product.image,
                  accentSoft: product.accentSoft,
                })
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-orange-deep"
            >
              <Plus className="h-4 w-4" />
              In mandje
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
