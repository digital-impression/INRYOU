/**
 * The ingredients themselves, drawn.
 *
 * This replaces the generated liquid splashes. Vector liquid never got past
 * looking like a lump of something — the honest version of a splash is a
 * photograph, and everything short of that read as slime. The ingredients are
 * the opposite problem: simple, recognisable forms that suit line work, and
 * they say what is actually in the can.
 *
 * Hairline only. A filled version was tried first and every motif lost what
 * identified it — the citrus slice in particular collapsed to a plain disc.
 * Line work is also the quieter of the two, which is the point: these sit
 * behind the content as texture rather than competing with it. Colour comes
 * from `currentColor`, so a caller sets tone and weight with ordinary
 * text-colour and opacity classes.
 */

export type Motif = "citrus" | "ginger" | "berry" | "leaf" | "pod" | "bubbles";

const TAU = Math.PI * 2;

/** A citrus slice: peel, pith and wedges, generated rather than hand-plotted. */
function Citrus() {
  const pt = (a: number, r: number) =>
    `${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`;
  const segments = Array.from({ length: 9 }, (_, i) => {
    const a0 = (i / 9) * TAU + 0.085;
    const a1 = ((i + 1) / 9) * TAU - 0.085;
    return `M${pt(a0, 7)} L${pt(a0, 32)} A32 32 0 0 1 ${pt(a1, 32)} L${pt(a1, 7)} A7 7 0 0 0 ${pt(a0, 7)} Z`;
  });
  return (
    <>
      <circle cx="50" cy="50" r="42" />
      <circle cx="50" cy="50" r="36" />
      {segments.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

/**
 * A ginger rhizome: one body with fingers budding off it at angles.
 * A single rounded lobe reads as a peach — the irregular fingers and the ring
 * markings across the body are what make it ginger.
 */
function Ginger() {
  return (
    <>
      <path d="M29,73 C20,61 22,43 33,34 C41,27 52,30 55,40 C58,49 54,59 48,66 C43,72 34,79 29,73 Z" />
      <path d="M55,40 C62,31 73,28 80,33 C86,37 84,46 77,50 C70,54 60,50 55,43" />
      <path d="M48,66 C56,68 63,74 64,82 C65,89 59,92 53,88 C47,84 45,75 46,68" />
      <path d="M33,45 C38,48 44,47 48,43" />
      <path d="M32,58 C37,61 43,60 47,56" />
    </>
  );
}

/** Two cranberries on the stem, with a leaf. */
function Berry() {
  return (
    <>
      <circle cx="37" cy="63" r="17" />
      <circle cx="65" cy="52" r="13" />
      <path d="M37,46 C39,33 45,25 54,21" />
      <path d="M65,39 C65,31 61,25 54,21" />
      <path d="M54,21 C62,12 74,11 82,15 C78,24 68,29 59,26" />
    </>
  );
}

function Leaf() {
  return (
    <>
      <path d="M50,13 C75,30 75,63 50,88 C25,63 25,30 50,13 Z" />
      <path d="M50,21 L50,81" />
      <path d="M50,40 L36,32M50,40 L64,32M50,56 L36,48M50,56 L64,48" />
    </>
  );
}

/** A vanilla pod, split. */
function Pod() {
  return (
    <>
      <path d="M40,13 C58,29 65,58 58,87 C50,82 38,66 34,47 C31,33 34,21 40,13 Z" />
      <path d="M42,20 C56,36 60,60 55,80" />
    </>
  );
}

/** Carbonation — the one non-botanical motif, for the sparkling itself. */
function Bubbles() {
  return (
    <>
      <circle cx="35" cy="64" r="14" />
      <circle cx="60" cy="46" r="10" />
      <circle cx="46" cy="29" r="6.5" />
      <circle cx="71" cy="70" r="7" />
      <circle cx="26" cy="38" r="5" />
      <circle cx="63" cy="24" r="3.5" />
    </>
  );
}

const motifs: Record<Motif, () => React.ReactNode> = {
  citrus: Citrus,
  ginger: Ginger,
  berry: Berry,
  leaf: Leaf,
  pod: Pod,
  bubbles: Bubbles,
};

/** Which ingredients belong to which flavour, keyed by the product theme. */
export const flavourMotifs: Record<string, Motif[]> = {
  cranberry: ["berry", "leaf"],
  ginger: ["ginger", "citrus"],
  sage: ["pod", "leaf"],
  neutral: ["leaf", "bubbles"],
};

export function Botanical({
  motif,
  rotate = 0,
  className = "",
}: {
  motif: Motif;
  rotate?: number;
  className?: string;
}) {
  const Shape = motifs[motif];
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Shape />
    </svg>
  );
}
