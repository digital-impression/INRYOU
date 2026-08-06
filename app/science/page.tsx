import type { Metadata } from "next";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Splat } from "@/components/ui/Splash";
import { Parallax } from "@/components/ui/Parallax";
import { Check, Close, ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "De wetenschap",
  description:
    "Wat er in een blik INRYOU zit en waarom: 75mg magnesiumcitraat, 120mg kaliumcitraat, geperst fruit en steviablad. Met de doseringen erbij, en met wat we niet weten.",
};

/** A full can, in numbers. The point of the page is that these are printed. */
const spec = [
  { label: "Magnesiumcitraat", value: "75 mg", note: "20% van de dagelijkse referentie-inname" },
  { label: "Kaliumcitraat", value: "120 mg", note: "6% van de dagelijkse referentie-inname" },
  { label: "Suikers", value: "1,8 g", note: "volledig uit het fruit zelf" },
  { label: "Energie", value: "15 kcal", note: "per 250 ml" },
  { label: "Fruitgehalte", value: "12%", note: "geperst, niet uit concentraat" },
  { label: "Zoetstof", value: "Steviolglycosiden", note: "uit steviablad, 0 kcal" },
];

/** Three steps in order, which is why they are numbered. */
const how = [
  {
    n: "01",
    title: "Citraat, geen oxide",
    text: "Magnesium bestaat in een stuk of tien vormen. Magnesiumoxide is goedkoop en zit in veel supplementen, maar je neemt er een fractie van op. Citraat is duurder en lost beter op in een drank. Wij gebruiken citraat.",
  },
  {
    n: "02",
    title: "Zout dat je niet proeft",
    text: "Elektrolyten helpen je lichaam vocht vasthouden in plaats van het meteen door te spoelen. De uitdaging is de dosering: genoeg om te tellen, te weinig om te proeven. Daar zijn de meeste van onze 41 mislukte recepten op stukgelopen.",
  },
  {
    n: "03",
    title: "Zoetheid uit twee bronnen",
    text: "Het fruit levert de body en een beetje suiker, steviablad vult de rest aan zonder calorieën. Stevia alleen geeft die metalige nasmaak. In combinatie met echt vruchtensap valt die weg.",
  },
];

const compare = [
  { label: "Suiker", inryou: "1,8 g", soda: "35 tot 40 g" },
  { label: "Zoetstof", inryou: "Steviablad", soda: "Suiker of glucosestroop" },
  { label: "Mineralen", inryou: "Magnesium en kalium", soda: "Geen" },
  { label: "Energie", inryou: "15 kcal", soda: "140+ kcal" },
  { label: "Additieven", inryou: "Geen", soda: "Kleur- en bewaarmiddelen" },
];

const faqs = [
  {
    q: "Zijn steviolglycosiden veilig?",
    a: "Ja. Ze worden gewonnen uit het blad van de steviaplant en zijn in de hele EU goedgekeurd als zoetstof (E960). Ze leveren geen calorieën en hebben geen effect op je bloedsuiker. De aanvaardbare dagelijkse inname ligt op 4mg per kilo lichaamsgewicht; een blik INRYOU zit daar ver onder.",
  },
  {
    q: "Doen die mineralen echt iets, of is het etiketvulling?",
    a: "75mg magnesium is 20% van de dagelijkse referentie-inname, en dat is genoeg om onder de Europese regels een claim te mogen voeren over spier- en zenuwfunctie. Kalium zit op 6%, wat lager is: dat noemen we een bijdrage, geen oplossing. Wat een blik niet doet, is een tekort aanvullen. Daarvoor moet je bij je huisarts zijn, niet bij ons.",
  },
  {
    q: "Waarom staat er dan toch suiker op het etiket?",
    a: "Omdat er echt fruit in gaat. Die 1,8 gram komt uit het sap zelf. We hadden naar nul kunnen gaan door het fruit te vervangen door aroma, en dan was het geen drank met fruit meer geweest.",
  },
  {
    q: "Hydrateert het beter dan water?",
    a: "Voor de meeste mensen op een gewone dag is water prima en heb je hier niks extra's aan. Na het sporten of bij warm weer, wanneer je ook zout verliest, helpen elektrolyten je vocht beter vasthouden. Dat is het scenario waarvoor dit gemaakt is.",
  },
  {
    q: "Past het in keto of een suikerarm eetpatroon?",
    a: "Met 1,8g suiker en 15 kcal per blik past het in vrijwel elk suikerarm patroon. Bij een strikt ketogeen dieet telt elke gram, dus reken het gewoon mee.",
  },
];

export default function SciencePage() {
  return (
    <>
      {/* Opening */}
      <section className="relative overflow-hidden">
        <Parallax
          distance={60}
          className="pointer-events-none absolute inset-0 text-orange"
        >
          <Splat seed={3} rotate={-10} className="-left-[8%] -top-[24%] h-[400px] w-[400px] opacity-[0.13]" />
          <Splat seed={7} flip className="-right-[10%] top-[26%] h-80 w-80 opacity-[0.1]" />
        </Parallax>

        <div className="container-px relative mx-auto max-w-4xl py-16 text-center lg:py-24">
          <Reveal>
            <p className="eyebrow">De wetenschap</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-4 text-balance display-hero">
              <span className="block uppercase">Alles staat</span>
              <span className="accent block text-orange-deep">op het blik.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="measure-center mt-6 text-pretty text-lg text-ink">
              De meeste functionele dranken noemen hun ingrediënten wel, maar
              niet de hoeveelheid. Dat is geen toeval. Hieronder staan de onze,
              inclusief het cijfer dat ons niet zo goed uitkomt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The can, in numbers */}
      <section className="container-px mx-auto max-w-7xl pb-16 lg:pb-24">
        <Reveal>
          <p className="eyebrow text-cranberry">Per blik van 250 ml</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-3 max-w-2xl text-balance display-2">
            Wat erin gaat, en{" "}
            <span className="accent text-cranberry">hoeveel.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
          {spec.map((s) => (
            <Reveal key={s.label} as="div">
              <div className="h-full bg-cream p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </p>
                <p className="mt-3 font-display text-4xl leading-none text-charcoal">
                  {s.value}
                </p>
                <p className="mt-3 text-sm text-ink">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </Stagger>

        <Reveal delay={2}>
          <p className="measure mt-8 text-pretty text-ink">
            Die 6% kalium is geen indrukwekkend getal. We zetten het er toch bij,
            want een blik frisdrank vervangen is iets anders dan een tekort
            oplossen, en dat verschil hoort niet in de kleine lettertjes te
            verdwijnen.
          </p>
        </Reveal>
      </section>

      {/* How it actually works */}
      <section className="bg-blush">
        <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
          <Reveal>
            <p className="eyebrow">Drie keuzes</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-3 max-w-2xl text-balance display-2">
              Waar het recept op{" "}
              <span className="accent text-orange-deep">stukliep.</span>
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {how.map((h) => (
              <Reveal key={h.n} as="div">
                <div className="border-t border-charcoal/15 pt-6">
                  <p className="font-display text-3xl text-orange-deep/50">
                    {h.n}
                  </p>
                  <h3 className="mt-3 text-balance text-xl leading-snug sm:text-2xl">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-pretty text-ink">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Side by side */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <Parallax
          distance={70}
          className="pointer-events-none absolute inset-0 text-cream"
        >
          <Splat seed={5} rotate={-12} className="-left-16 -top-12 h-80 w-80 opacity-[0.07] lg:h-96 lg:w-96" />
          <Splat seed={0} flip className="-bottom-16 right-[4%] h-72 w-72 opacity-[0.06]" />
        </Parallax>

        <div className="container-px relative mx-auto max-w-4xl py-20 lg:py-24">
          <Reveal>
            <h2 className="text-balance text-cream display-2">
              De cijfers liegen niet.
            </h2>
            <p className="mt-4 text-cream/70">
              Een portie van 250 ml, naast een gemiddelde cola.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-cream/15">
              <table className="w-full table-fixed border-collapse text-left">
                <caption className="sr-only">
                  INRYOU naast klassieke frisdrank, per 250 ml
                </caption>
                <colgroup>
                  <col className="w-[34%]" />
                  <col className="w-[36%] bg-cream/[0.05]" />
                  <col className="w-[30%]" />
                </colgroup>
                <thead>
                  <tr className="bg-cream/5 text-sm font-medium uppercase tracking-[0.12em]">
                    <th scope="col" className="px-3.5 py-4 text-left text-[0.7rem] text-cream/55 sm:px-7 sm:text-sm">
                      Waarde
                    </th>
                    <th scope="col" className="border-l border-t-2 border-l-cream/10 border-t-orange px-2.5 py-4 text-center text-[0.7rem] text-cream sm:px-5 sm:text-sm">
                      INRYOU
                    </th>
                    <th scope="col" className="border-l border-cream/10 px-2.5 py-4 text-center text-[0.7rem] text-cream/55 sm:px-5 sm:text-sm">
                      Frisdrank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row, i) => (
                    <tr key={row.label} className={i % 2 ? "bg-cream/[0.03]" : ""}>
                      <th scope="row" className="px-3.5 py-4 text-left text-[0.84rem] font-semibold text-cream sm:px-7 sm:text-[0.95rem]">
                        {row.label}
                      </th>
                      <td className="border-l border-cream/10 px-2.5 py-4 sm:px-5">
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4 shrink-0 text-sage" />
                          <span className="hyphens-auto break-words text-[0.84rem] font-medium text-cream sm:text-[0.95rem]">
                            {row.inryou}
                          </span>
                        </span>
                      </td>
                      <td className="border-l border-cream/10 px-2.5 py-4 sm:px-5">
                        <span className="flex items-center gap-2 text-cream/60">
                          <Close className="h-4 w-4 shrink-0 text-cranberry" />
                          <span className="hyphens-auto break-words text-[0.84rem] sm:text-[0.95rem]">
                            {row.soda}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we don't claim */}
      <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-cranberry">Even eerlijk</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 text-balance display-2">
                Wat dit <span className="accent text-cranberry">niet</span> doet.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={1} as="div">
            <div className="measure space-y-4 text-pretty text-lg text-ink">
              <p>
                Het maakt je niet scherper dan je bent na een slechte nacht. Het
                vervangt geen maaltijd, geen supplement en geen dokter. En als
                je vandaag vijf blikken drinkt gebeurt er niks bijzonders,
                behalve dat je vaker naar het toilet moet.
              </p>
              <p>
                Wat het wel doet: het is een stuk beter dan het alternatief dat
                anders in je hand had gelegen. Dat is een bescheiden claim, en
                het is de enige die we hard kunnen maken.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px mx-auto max-w-3xl pb-20 lg:pb-28">
        <Reveal>
          <h2 className="text-center display-3">De kleine lettertjes</h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-12 text-center">
            <ButtonLink href="/shop" size="lg">
              Proef het verschil
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
