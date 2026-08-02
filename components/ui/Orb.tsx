import type { CSSProperties } from "react";

type Tone = "sunset" | "cream" | "sage";

// Feature-list icons live in `IconBadge` — hairline rings rather than filled
// discs, which sit better against this icon set's thin strokes.

const tones: Record<Tone, { a: string; b: string; c: string }> = {
  // warm rising-sun — the signature INRYOU gradient
  sunset: { a: "#f0c98a", b: "#e07c3a", c: "#b23a4b" },
  // light watermark for use on dark oxblood backgrounds
  cream: { a: "#fbf7ef", b: "#f4d9bf", c: "#e07c3a" },
  sage: { a: "#cdd8c4", b: "#9aae93", c: "#76896f" },
};

/**
 * The INRYOU signature motif — a rising-sun orb extracted from the packaging.
 * Reused as hero backdrop, section-header watermark, footer wash and icon base.
 */
export function Orb({
  tone = "sunset",
  rays = false,
  spin = false,
  breathe = false,
  opacity = 1,
  className = "",
  style,
}: {
  tone?: Tone;
  rays?: boolean;
  spin?: boolean;
  breathe?: boolean;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const t = tones[tone];
  const id = `orb-${tone}-${rays ? "r" : "n"}`;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block ${
        breathe ? "animate-orb-breathe" : ""
      } ${className}`}
      style={{ ["--orb-o" as string]: opacity, opacity, ...style }}
    >
      <svg
        viewBox="0 0 200 200"
        className={`h-full w-full ${spin ? "animate-orb-spin" : ""}`}
        style={{ transformOrigin: "50% 50%" }}
      >
        <defs>
          <radialGradient id={id} cx="50%" cy="52%" r="52%">
            <stop offset="0%" stopColor={t.a} />
            <stop offset="42%" stopColor={t.b} />
            <stop offset="78%" stopColor={t.c} />
            <stop offset="100%" stopColor={t.c} stopOpacity="0" />
          </radialGradient>
        </defs>
        {rays &&
          Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="98.5"
              y="4"
              width="3"
              height="20"
              rx="1.5"
              fill={t.b}
              opacity="0.5"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        <circle cx="100" cy="100" r="66" fill={`url(#${id})`} />
      </svg>
    </span>
  );
}
