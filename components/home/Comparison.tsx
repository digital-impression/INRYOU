import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Splat } from "@/components/ui/Splash";
import { Check, Close, ArrowRight } from "@/components/ui/icons";

const rows = [
  { label: "Suiker", inryou: "Minder dan 2g", soda: "25g+ per blik" },
  { label: "Functionele mineralen", inryou: "Magnesium & kalium", soda: "Geen" },
  { label: "Gezoet met", inryou: "Steviablad & echt fruit", soda: "Suiker & siroop" },
  { label: "Kunstmatige kleurstoffen", inryou: "Geen", soda: "Vaak wel" },
  { label: "Gevoel achteraf", inryou: "Rustige energie", soda: "Suikercrash" },
];

export function Comparison() {
  return (
    <section className="relative bg-charcoal text-cream">
      {/* The section itself can't clip — the drips run out of its bottom edge —
          so the background paint gets its own clipped layer. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Parallax distance={80} className="absolute inset-0 text-cream">
        <Splat seed={3} rotate={-10} className="-left-16 -top-10 h-72 w-72 opacity-[0.07] lg:h-96 lg:w-96" />
        <Splat seed={7} flip className="-bottom-12 right-[3%] h-64 w-64 opacity-[0.06] lg:h-80 lg:w-80" />
      </Parallax>
      </div>

      <div className="container-px relative mx-auto max-w-7xl py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Narrative — the leidraad */}
          <div>
            <Reveal>
              <p className="eyebrow text-orange">Wij maken het verschil</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 text-balance text-cream display-2">
                Waarom INRYOU je dagelijkse{" "}
                <span className="accent text-orange">keuze</span> wordt.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="measure mt-5 text-pretty text-lg text-cream/70">
                Alles wat je lekker vindt aan frisdrank — de fizz, het ritueel,
                de smaak — zonder de suiker en de crash. Zie het verschil in één
                oogopslag.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-cream/[0.06] p-5 ring-1 ring-cream/15">
                  <p className="font-display text-4xl text-orange">94%</p>
                  <p className="mt-1 text-sm text-cream/70">
                    minder suiker dan klassieke frisdrank
                  </p>
                </div>
                <div className="rounded-2xl bg-cream/[0.06] p-5 ring-1 ring-cream/15">
                  <p className="font-display text-4xl text-sage">2</p>
                  <p className="mt-1 text-sm text-cream/70">
                    functionele mineralen in elk blik
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="mt-8">
                <ButtonLink href="/shop">
                  Proef het verschil
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Decision table, in the same dark treatment as "De cijfers liegen
              niet" on the science page. Still one `table-fixed` table with a
              colgroup: per-row grids sized their columns independently and the
              edges stepped in and out down the card. */}
          <Reveal delay={1} as="div">
            <div className="overflow-hidden rounded-3xl ring-1 ring-cream/15">
              <table className="w-full table-fixed border-collapse text-left">
                <caption className="sr-only">
                  INRYOU vergeleken met klassieke frisdrank
                </caption>
                <colgroup>
                  <col className="w-[34%] sm:w-[36%]" />
                  <col className="w-[36%] bg-cream/[0.05] sm:w-[34%]" />
                  <col className="w-[30%]" />
                </colgroup>

                <thead>
                  {/*
                    One line per header. Stacking a second line onto the INRYOU
                    cell pushed it off the baseline the other two sit on; the
                    orange top rule marks the winning column instead.
                  */}
                  <tr className="bg-cream/5 text-sm font-medium uppercase tracking-[0.12em]">
                    <th
                      scope="col"
                      className="px-3.5 py-4 text-left text-[0.7rem] text-cream/55 sm:px-7 sm:text-sm"
                    >
                      Waarde
                    </th>
                    <th
                      scope="col"
                      className="border-l border-t-2 border-l-cream/10 border-t-orange px-2.5 py-4 text-left text-[0.7rem] text-cream sm:px-5 sm:text-sm"
                    >
                      INRYOU
                    </th>
                    <th
                      scope="col"
                      className="border-l border-cream/10 px-2.5 py-4 text-left text-[0.7rem] text-cream/55 sm:px-5 sm:text-sm"
                    >
                      Frisdrank
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, idx) => (
                    <tr
                      key={row.label}
                      className={idx % 2 ? "bg-cream/[0.03]" : ""}
                    >
                      <th
                        scope="row"
                        className="px-3.5 py-4 text-left text-[0.84rem] font-normal text-cream/85 sm:px-7 sm:text-[0.95rem]"
                      >
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

                <tfoot>
                  <tr className="border-t border-cream/15">
                    <th
                      scope="row"
                      className="px-3.5 py-4 text-left text-[0.84rem] font-medium text-cream sm:px-7 sm:text-[0.95rem]"
                    >
                      De slimmere keuze
                    </th>
                    <td className="border-l border-cream/10 bg-orange px-2.5 py-4 text-left text-[0.84rem] font-bold text-white sm:px-5 sm:text-[0.95rem]">
                      INRYOU
                    </td>
                    <td className="border-l border-cream/10 px-2.5 py-4 text-left text-sm text-cream/35 sm:px-5">
                      <span aria-hidden>—</span>
                      <span className="sr-only">Niet van toepassing</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
