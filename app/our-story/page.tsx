import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Splat } from "@/components/ui/Splash";
import { Parallax } from "@/components/ui/Parallax";
import { ArrowRight } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Ons verhaal",
  description:
    "Waarom INRYOU bestaat: één frustratie om vier uur 's middags, twee jaar proeven, en de koppige keuze om onder de 2g suiker te blijven terwijl zoeter makkelijker verkoopt.",
};

/** Written as claims we can be held to, not as values on a poster. */
const stances = [
  {
    n: "01",
    title: "Zoeter verkoopt beter. Jammer dan.",
    text: "Elke keer dat we een recept lieten proeven kwam dezelfde opmerking: doe er wat suiker bij. We hebben het één keer geprobeerd en het smaakte inderdaad meteen makkelijker. Het staat niet in het blik.",
  },
  {
    n: "02",
    title: "Als een ingrediënt niks doet, gaat het eruit",
    text: "Geen vitaminelijstje om het etiket te vullen. Wat erin zit, zit erin op een hoeveelheid die telt, en we zetten er het getal bij.",
  },
  {
    n: "03",
    title: "Het moet iets zijn waar je zin in hebt",
    text: "Gezond drinken dat aanvoelt als huiswerk houdt niemand vol. Als je er niet naar grijpt op een dinsdagmiddag om vier uur, hebben we ons werk niet goed gedaan.",
  },
  {
    n: "04",
    title: "Belgisch, en dat blijft zo",
    text: "Gebrouwen bij Mechelen, twintig minuten van waar de eerste tests in een keukenpan gingen. Het scheelt transport en het scheelt uitleg.",
  },
];

const numbers = [
  { v: "2 jaar", l: "van proeven voor het eerste blik de deur uit ging" },
  { v: "41", l: "recepten die het niet gehaald hebben" },
  { v: "1,8g", l: "suiker per blik, en daar blijft het bij" },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Opening */}
      <section className="relative overflow-hidden">
        <Parallax
          distance={60}
          className="pointer-events-none absolute inset-0 text-cranberry"
        >
          <Splat seed={2} rotate={-14} className="-left-[10%] -top-[20%] h-[420px] w-[420px] opacity-[0.14]" />
          <Splat seed={5} flip className="-right-[8%] top-[30%] h-80 w-80 opacity-[0.1]" />
        </Parallax>

        <div className="container-px relative mx-auto max-w-4xl py-16 text-center lg:py-24">
          <Reveal>
            <p className="eyebrow">Ons verhaal</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-4 text-balance display-hero">
              <span className="block uppercase">Het begon om</span>
              <span className="accent block text-orange-deep">vier uur 's middags.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="measure-center mt-6 text-pretty text-lg text-ink">
              Dat moment waarop je koffie niks meer doet, water te saai is en de
              automaat één ding aanbiedt: iets met negen suikerklontjes erin.
              Daar hebben we twee jaar aan besteed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The frustration, told straight */}
      <section className="bg-blush">
        <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-balance display-2">
                  We wilden het gewoon{" "}
                  <span className="accent text-cranberry">kopen.</span>
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <div className="measure mt-6 space-y-4 text-pretty text-lg text-ink">
                  <p>
                    Eerst hebben we gezocht. Bruisend, weinig suiker, smaakt
                    naar iets. Wat we vonden was ofwel water met een vleugje
                    aroma, ofwel frisdrank met een gezondheidsclaim op de
                    voorkant en 30 gram suiker op de achterkant.
                  </p>
                  <p>
                    Tussen die twee zat niets. Dus zijn we in een keukenpan
                    begonnen, met veenbessen van de markt en veel te veel
                    gember. Dat eerste recept was ondrinkbaar.
                  </p>
                  <p className="font-medium text-charcoal">
                    Nummer 42 niet.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={1} as="div">
              <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-charcoal/5">
                <Image
                  src={asset("/images/can-in-hand.jpg")}
                  alt="Een INRYOU blik in de hand tegen een heldere lucht"
                  width={480}
                  height={568}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="container-px mx-auto max-w-7xl py-16 lg:py-20">
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {numbers.map((n) => (
            <Reveal key={n.v} as="div">
              <div className="rounded-3xl bg-white/70 p-8 ring-1 ring-charcoal/5">
                <p className="font-display text-5xl leading-none text-orange-deep">
                  {n.v}
                </p>
                <p className="mt-3 text-pretty text-ink">{n.l}</p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </section>

      {/* Stances, on the brand's dark panel */}
      <section className="container-px mx-auto max-w-7xl py-8 lg:py-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-charcoal px-6 py-16 text-cream sm:px-12 lg:px-16 lg:py-20">
          <Parallax distance={70} className="pointer-events-none absolute inset-0 text-cream">
            <Splat seed={6} rotate={-8} className="-right-16 -top-12 h-80 w-80 opacity-[0.08] lg:h-96 lg:w-96" />
            <Splat seed={1} flip className="-bottom-16 left-4 h-64 w-64 opacity-[0.06]" />
          </Parallax>

          <div className="relative">
            <Reveal>
              <p className="eyebrow text-orange">Waar we niet van afwijken</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 max-w-2xl text-balance text-cream display-2">
                Vier dingen die we{" "}
                <span className="accent text-orange">niet doen.</span>
              </h2>
            </Reveal>

            <Stagger className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {stances.map((s) => (
                <Reveal key={s.n} as="div">
                  <div className="border-t border-cream/15 pt-6">
                    <p className="font-display text-3xl text-orange/70">{s.n}</p>
                    <h3 className="mt-3 text-balance text-xl text-cream sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-pretty text-cream/70">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Where it stands now */}
      <section className="container-px mx-auto max-w-3xl py-20 text-center lg:py-28">
        <Reveal>
          <h2 className="text-balance display-2">
            En nu staat het in{" "}
            <span className="accent text-orange-deep">140 winkels.</span>
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="measure-center mt-5 text-pretty text-lg text-ink">
            We zijn met vier. Er is geen marketingafdeling, wel een proefpanel
            van vrienden dat eerlijker is dan ons lief is. De kweepeer &amp;
            vanille ligt er al negen maanden op, omdat hij nog niet goed genoeg
            was.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/shop" size="lg">
              Proef het zelf
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/science" variant="outline" size="lg">
              Wat er precies in zit
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
