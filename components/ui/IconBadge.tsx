import type { ReactNode } from "react";

export type BadgeTone = "orange" | "cranberry" | "sage" | "cream";

/**
 * Icon container used across feature lists.
 *
 * Deliberately hairline rather than a filled gradient disc: the icon set is
 * drawn with thin strokes, so a heavy solid circle fights it. A tinted wash
 * plus a 1px ring keeps the icons quiet and lets the type lead.
 */
const onLight: Record<BadgeTone, string> = {
  orange: "bg-orange/[0.09] text-orange-deep ring-orange/25",
  cranberry: "bg-cranberry/[0.08] text-cranberry ring-cranberry/25",
  sage: "bg-sage/25 text-sage-deep ring-sage-deep/35",
  cream: "bg-charcoal/[0.05] text-charcoal ring-charcoal/15",
};

const onDark: Record<BadgeTone, string> = {
  orange: "bg-orange/15 text-orange ring-orange/35",
  cranberry: "bg-cranberry/20 text-cranberry-soft ring-cranberry-soft/30",
  sage: "bg-sage/15 text-sage ring-sage/35",
  cream: "bg-cream/[0.07] text-cream ring-cream/20",
};

export function IconBadge({
  tone = "orange",
  surface = "light",
  className = "",
  children,
}: {
  tone?: BadgeTone;
  surface?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const tones = surface === "dark" ? onDark : onLight;
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ring-1 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
