/**
 * The brand's splash device.
 *
 * Every shape is a simple geometric source torn apart by a turbulence
 * displacement filter — that is what produces a ragged paint edge and stringy
 * tendrils; a union of discs, however irregularly scattered, still reads as
 * discs because every edge stays a perfect arc.
 *
 * The source geometry is what separates the variants, and it matters: an
 * amorphous mass reads as a coastline no matter how you tune the filter —
 * softening it only turned the archipelago into a continent. Liquid needs
 * radial structure the filter roughens rather than dissolves, so every variant
 * here is built from a throw direction outward.
 *
 *   burst  — a drop impact: tapered arms thrown off a core. The default.
 *   spray  — flicked paint, almost all droplets, barely any body.
 *   drip   — a mass with runs hanging off its lower edge.
 *
 * Fully deterministic — variation comes from feTurbulence's own `seed` and from
 * arithmetic on it, so nothing can mismatch between server and browser.
 */

export type SplatVariant = "burst" | "spray" | "drip";

const TAU = Math.PI * 2;

/**
 * Deterministic 0..1 from a seed and an index.
 *
 * An integer hash rather than the usual sin(dot(...)) trick: that aliases badly
 * for consecutive indices, and the smooth runs it produces made the spray
 * droplets line up into a neat arc instead of scattering.
 */
function noise(seed: number, i: number) {
  let h = (Math.imul(seed, 374761393) + Math.imul(i, 668265263)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const tune: Record<
  SplatVariant,
  { frequency: number; scale: number; octaves: number }
> = {
  // Low amplitude: keep the radial throw legible, just roughen its edges.
  burst: { frequency: 0.03, scale: 22, octaves: 3 },
  spray: { frequency: 0.05, scale: 13, octaves: 2 },
  drip: { frequency: 0.022, scale: 17, octaves: 3 },
};

/** A drop hitting a surface: uneven tapered arms, each ending in a bead. */
function burstSource(seed: number, arms: number) {
  const parts = [<circle key="core" cx="100" cy="100" r="26" />];
  const n = Math.max(5, arms);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + noise(seed, i) * 0.7;
    const len = 34 + 46 * noise(seed, i + 40);
    const w = 5 + 7 * noise(seed, i + 80);
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    const px = -dy;
    const py = dx;
    const tipX = 100 + dx * len;
    const tipY = 100 + dy * len;
    parts.push(
      <path
        key={`a${i}`}
        d={`M${(100 + px * w).toFixed(1)},${(100 + py * w).toFixed(1)} L${tipX.toFixed(1)},${tipY.toFixed(1)} L${(100 - px * w).toFixed(1)},${(100 - py * w).toFixed(1)} Z`}
      />,
    );
    // Bead flung off the tip, detached often enough to read as thrown
    const gap = 6 + 12 * noise(seed, i + 120);
    parts.push(
      <circle
        key={`b${i}`}
        cx={tipX + dx * gap}
        cy={tipY + dy * gap}
        r={1.5 + 5 * noise(seed, i + 160)}
      />,
    );
  }
  return parts;
}

/** Flicked paint — almost no body, thrown along one axis. */
function spraySource(seed: number, arms: number) {
  const dir = noise(seed, 3) * TAU;
  const count = Math.max(22, arms * 4);
  const parts = [];
  for (let i = 0; i < count; i++) {
    // A wide fan around `dir`, tightening as the droplets travel further
    const reach = noise(seed, i + 200);
    const spread = 2.3 * (1 - reach * 0.55);
    const a = dir + (noise(seed, i + 7) - 0.5) * spread;
    const d = 10 + 88 * reach;
    parts.push(
      <circle
        key={i}
        cx={100 + Math.cos(a) * d}
        cy={100 + Math.sin(a) * d}
        // Cubed: overwhelmingly fine, with the odd fat drop
        r={1 + 10 * Math.pow(noise(seed, i + 300), 3)}
      />,
    );
  }
  return parts;
}

/** A mass with runs sagging off its lower edge. */
function dripSource(seed: number, arms: number) {
  const parts = [
    <ellipse key="m" cx="100" cy="86" rx="52" ry="30" />,
    <ellipse key="m2" cx="118" cy="78" rx="30" ry="20" />,
  ];
  const n = Math.max(3, Math.round(arms / 2));
  for (let i = 0; i < n; i++) {
    const x = 58 + (84 / Math.max(1, n - 1)) * i + noise(seed, i) * 10;
    const len = 26 + 58 * noise(seed, i + 30);
    const w = 3 + 5 * noise(seed, i + 60);
    parts.push(
      <rect
        key={`r${i}`}
        x={x - w}
        y={100}
        width={w * 2}
        height={len}
        rx={w}
      />,
      <circle key={`h${i}`} cx={x} cy={100 + len} r={w * 1.5} />,
    );
  }
  return parts;
}

const sources = {
  burst: burstSource,
  spray: spraySource,
  drip: dripSource,
};

export function Splatter({
  seed = 1,
  variant = "burst",
  color,
  opacity = 1,
  /** Arms for `burst`, density for `spray` and `drip`. */
  arms = 7,
  className = "",
}: {
  seed?: number;
  variant?: SplatVariant;
  color: string;
  opacity?: number;
  arms?: number;
  className?: string;
}) {
  const id = `splat-${variant}-${seed}`;
  const t = tune[variant];

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute ${className}`}
    >
      <defs>
        <filter
          id={id}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={t.frequency}
            numOctaves={t.octaves}
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={t.scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g fill={color} opacity={opacity} filter={`url(#${id})`}>
        {sources[variant](seed, arms)}
      </g>
    </svg>
  );
}
