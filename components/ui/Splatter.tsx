/**
 * The brand's splash device: a paint-splat.
 *
 * A union of discs — however irregularly you scatter them — still reads as
 * discs, because every edge stays a perfect arc. So the shape is built from a
 * simple asymmetric mass plus satellites and then torn apart by a turbulence
 * displacement filter, which is what gives paint its ragged edge and stringy
 * tendrils. Opacity lives on the group so overlaps never darken.
 *
 * Fully deterministic — the variation comes from feTurbulence's own `seed`, so
 * there is no randomness to mismatch between server and browser.
 */

type Blob = { cx: number; cy: number; r: number };

const TAU = Math.PI * 2;

/** Cheap deterministic jitter so each seed lays its satellites out differently. */
function scatter(seed: number, count: number, near: number, far: number): Blob[] {
  const out: Blob[] = [];
  for (let i = 0; i < count; i++) {
    // Golden-angle walk: even coverage, no clustering, no RNG.
    const a = (i * 2.399963 + seed * 0.7) % TAU;
    const t = (Math.sin(seed * 12.9898 + i * 78.233) + 1) / 2;
    const d = near + (far - near) * t;
    const r = 3 + 9 * (1 - t) * ((Math.cos(seed + i * 3.7) + 1) / 2);
    out.push({ cx: 100 + Math.cos(a) * d, cy: 100 + Math.sin(a) * d, r });
  }
  return out;
}

export function Splatter({
  seed = 1,
  color,
  opacity = 1,
  /** Satellites flung clear of the main mass. */
  arms = 7,
  className = "",
}: {
  seed?: number;
  color: string;
  opacity?: number;
  arms?: number;
  className?: string;
}) {
  const id = `splat-${seed}`;
  const drops = scatter(seed, arms, 46, 84);

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
            baseFrequency="0.018"
            numOctaves={4}
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={54}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g fill={color} opacity={opacity} filter={`url(#${id})`}>
        {/* Asymmetric mass — the displacement does the rest */}
        <circle cx="100" cy="100" r="40" />
        <circle cx="122" cy="88" r="26" />
        <circle cx="82" cy="118" r="29" />
        <circle cx="115" cy="122" r="20" />
        {drops.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} />
        ))}
      </g>
    </svg>
  );
}
