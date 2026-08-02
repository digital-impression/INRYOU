import { IconBadge } from "@/components/ui/IconBadge";
import { Check, Drop, Leaf, Globe } from "@/components/ui/icons";

const claims = [
  { icon: Check, tone: "orange" as const, label: "Minder dan 2g suiker" },
  { icon: Drop, tone: "cranberry" as const, label: "Magnesium & kalium" },
  { icon: Leaf, tone: "sage" as const, label: "Echt fruit, geen concentraat" },
  { icon: Globe, tone: "cream" as const, label: "Belgisch gebrouwen" },
];

/**
 * The four claims that carry the product, held still.
 *
 * This used to be a scrolling ticker directly under the hero; sitting that
 * close to the headline it competed with it, so the same content is now a
 * quiet, readable band.
 */
export function ProofBar() {
  return (
    <div className="border-y border-charcoal/10 bg-cream-deep">
      <ul className="container-px mx-auto grid max-w-7xl grid-cols-2 divide-charcoal/10 py-6 sm:divide-x lg:grid-cols-4">
        {claims.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-center gap-3 px-4 py-3 text-center sm:py-1"
          >
            <IconBadge tone={c.tone} className="h-8 w-8">
              <c.icon className="h-4 w-4" strokeWidth={1.7} />
            </IconBadge>
            <span className="text-sm font-medium leading-snug text-charcoal-soft">
              {c.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
