import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { posts } from "@/lib/blog";
import { themeBg, themeText } from "@/lib/themeStyles";
import { asset } from "@/lib/asset";

// The three reads that answer the questions this section raises: the afternoon
// dip, what the minerals actually do, and why the brand exists at all.
const featuredSlugs = [
  "rethinking-the-afternoon-slump",
  "what-functional-minerals-do",
  "the-inryou-philosophy",
];

export function Lifestyle() {
  const picks = featuredSlugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is (typeof posts)[number] => Boolean(p));

  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="text-center">
        <Reveal>
          <p className="eyebrow">Een manier van leven</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-3 text-balance display-2">
            Balans, waar het leven je ook{" "}
            <span className="accent text-cranberry">brengt.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="measure-center mt-5 text-pretty text-lg text-ink">
            INRYOU is geen detox of ontbering. Het is een kleine, dagelijkse
            upgrade — de rustige keuze die past in een vol, modern leven.
          </p>
        </Reveal>
      </div>

      {/* Featured — the photograph carries this one instead of a colour block */}
      <Reveal as="div" className="mt-12">
        <Link
          href="/our-story"
          className="group grid overflow-hidden rounded-[2rem] ring-1 ring-charcoal/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-32px_rgba(56,22,26,0.3)] lg:grid-cols-2"
        >
          <div className="relative min-h-[260px] lg:min-h-[340px]">
            <Image
              src={asset("/images/can-in-hand.jpg")}
              alt="Een INRYOU Cranberry blik tegen een heldere lucht"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover object-[50%_38%] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <span className="absolute left-8 top-8 text-xs font-semibold uppercase tracking-[0.16em] text-cream">
              Uitgelicht · Ons verhaal
            </span>
          </div>
          <div className="flex flex-col justify-center bg-white/60 p-8 lg:p-12">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">
              Gemaakt voor elke dag
            </p>
            <h3 className="mt-3 text-balance text-3xl leading-tight sm:text-4xl">
              Van ochtendritueel tot de reset in de namiddag
            </h3>
            <p className="mt-4 text-pretty text-ink">
              Rustige energie zonder crash, mineralen die stil op de achtergrond
              werken, en de overtuiging dat welzijn de makkelijke keuze zou
              moeten zijn — van ons recept tot onze blikjes.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium text-orange-deep">
              Ontdek ons verhaal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>

      <Stagger className="mt-6 grid gap-6 md:grid-cols-3">
        {picks.map((post) => (
          <Reveal key={post.slug} as="div">
            <Link
              href={`/journal/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/60 ring-1 ring-charcoal/5 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(56,22,26,0.3)]"
            >
              <div className={`flex h-36 items-end p-6 ${themeBg[post.theme]}`}>
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.16em] ${themeText[post.theme]}`}
                >
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">
                  {post.readingTime}
                </p>
                <h3 className="mt-2 text-balance text-xl leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-pretty text-sm text-ink">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-charcoal">
                  Lees meer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </Stagger>
    </section>
  );
}
