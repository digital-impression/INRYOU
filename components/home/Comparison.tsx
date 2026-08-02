import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
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
    <section className="bg-blush">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Narrative — the leidraad */}
          <div>
            <Reveal>
              <p className="eyebrow">Wij maken het verschil</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 text-balance display-2">
                Waarom INRYOU je dagelijkse{" "}
                <span className="accent text-cranberry">keuze</span> wordt.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="measure mt-5 text-pretty text-lg text-ink">
                Alles wat je lekker vindt aan frisdrank — de fizz, het ritueel,
                de smaak — zonder de suiker en de crash. Zie het verschil in één
                oogopslag.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-charcoal/10">
                  <p className="font-display text-4xl text-cranberry">94%</p>
                  <p className="mt-1 text-sm text-ink">
                    minder suiker dan klassieke frisdrank
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-charcoal/10">
                  <p className="font-display text-4xl text-orange-deep">2</p>
                  <p className="mt-1 text-sm text-ink">
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

          {/* Decision table — INRYOU visibly wins */}
          <Reveal delay={1} as="div">
            <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_70px_-45px_rgba(56,22,26,0.5)] ring-1 ring-charcoal/10">
              {/*
                A real table, and one grid rather than one grid per row: with
                per-row `fr` columns every row sized itself independently, so
                the column edges stepped in and out down the card. `table-fixed`
                plus a colgroup locks them. The colgroup also carries the INRYOU
                tint, which keeps the winning column one continuous block
                instead of a stack of separately-shaded cells.
              */}
              <table className="w-full table-fixed border-collapse text-left">
                <caption className="sr-only">
                  INRYOU vergeleken met klassieke frisdrank
                </caption>
                <colgroup>
                  <col className="w-[34%] sm:w-[38%]" />
                  <col className="w-[36%] bg-orange-soft/40 sm:w-[32%]" />
                  <col className="w-[30%]" />
                </colgroup>

                <thead>
                  <tr>
                    <th className="px-3.5 py-4 sm:px-7">
                      <span className="sr-only">Kenmerk</span>
                    </th>
                    <th
                      scope="col"
                      className="border-l border-t-[3px] border-l-charcoal/10 border-t-orange bg-orange-soft/60 px-2.5 py-4 text-center align-bottom sm:px-5"
                    >
                      <span className="inline-flex rounded-full bg-orange px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white">
                        Onze keuze
                      </span>
                      <span className="mt-2 block font-sans text-sm font-bold tracking-[0.06em] text-charcoal">
                        INRYOU
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="border-l border-charcoal/10 px-2.5 py-4 text-center align-bottom text-sm font-medium text-muted sm:px-5"
                    >
                      Frisdrank
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-t border-charcoal/10">
                      <th
                        scope="row"
                        className="px-3.5 py-4 text-[0.8rem] font-medium text-charcoal sm:px-7 sm:text-sm"
                      >
                        {row.label}
                      </th>
                      <td className="border-l border-charcoal/10 px-2.5 py-4 sm:px-5">
                        <span className="flex items-center gap-2.5">
                          <IconBadge tone="sage" className="h-5 w-5">
                            <Check className="h-3 w-3" strokeWidth={2.4} />
                          </IconBadge>
                          <span className="hyphens-auto break-words text-[0.8rem] font-semibold text-charcoal sm:text-sm">
                            {row.inryou}
                          </span>
                        </span>
                      </td>
                      <td className="border-l border-charcoal/10 px-2.5 py-4 sm:px-5">
                        <span className="flex items-center gap-2">
                          <Close
                            className="h-3.5 w-3.5 shrink-0 text-muted/45"
                            strokeWidth={2}
                          />
                          <span className="hyphens-auto break-words text-[0.8rem] text-muted sm:text-sm">
                            {row.soda}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="bg-charcoal text-cream">
                    <th
                      scope="row"
                      className="px-3.5 py-4 text-[0.8rem] font-medium sm:px-7 sm:text-sm"
                    >
                      De slimmere keuze
                    </th>
                    <td className="bg-orange px-2.5 py-4 text-center text-[0.8rem] font-bold text-white sm:px-5 sm:text-sm">
                      INRYOU
                    </td>
                    <td className="px-2.5 py-4 text-center text-sm text-cream/40 sm:px-5">
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
