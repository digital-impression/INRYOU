/**
 * The brand's splash device — liquid, not paint.
 *
 * The earlier version built everything from straight tapered spikes and filled
 * it flat. That is what a loaded brush flicked at a wall does, and it read
 * exactly like that: angular and matte. Juice behaves the other way round —
 * surface tension rounds every edge, thrown arms whip into a curve rather than
 * a straight line, and they let go of round beads at the tip. So arms here are
 * chains of overlapping circles along a bezier: they taper and stay round, and
 * the turbulence is turned right down — just enough to break the machine
 * perfection, not enough to chew the roundness off.
 *
 * Every shape is filled with a gradient and carries a wet highlight, because a
 * flat fill is what made these look dull however far the opacity was pushed.
 *
 *   splash  — a drop impact: whipping arms and flung droplets. The default.
 *   ribbon  — a thick arc of liquid, mid-pour.
 *   spray   — flicked droplets, almost no body.
 *   drip    — a mass with runs sagging off its lower edge.
 *
 * Fully deterministic: variation comes from an integer hash of the seed, so
 * nothing shifts between server and browser.
 */

export type SplatVariant = "splash" | "ribbon" | "spray" | "drip";

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

type Part = { cx: number; cy: number; r: number };

/**
 * A tendril: circles laid along a quadratic bezier, tapering, with a round
 * bead thrown off the end. `bend` is what stops it reading as a spike.
 */
function tendril(
  angle: number,
  len: number,
  bend: number,
  width: number,
  bead: number,
): Part[] {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const px = -dy;
  const py = dx;
  const x2 = 100 + dx * len + px * bend;
  const y2 = 100 + dy * len + py * bend;
  const x1 = 100 + dx * len * 0.5 + px * bend * 0.12;
  const y1 = 100 + dy * len * 0.5 + py * bend * 0.12;

  const steps = 15;
  const out: Part[] = [];
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const mt = 1 - t;
    out.push({
      cx: mt * mt * 100 + 2 * mt * t * x1 + t * t * x2,
      cy: mt * mt * 100 + 2 * mt * t * y1 + t * t * y2,
      r: Math.max(width * (1 - t * 0.8), 0.9),
    });
  }
  // The droplet has let go of the tip
  const gap = bead * 2.1;
  out.push({ cx: x2 + dx * gap, cy: y2 + dy * gap, r: bead });
  return out;
}

function splashSource(seed: number, arms: number): Part[] {
  const parts: Part[] = [{ cx: 100, cy: 100, r: 25 }];
  // A few fat lobes so the crown isn't a perfect circle
  for (let i = 0; i < 3; i++) {
    const a = noise(seed, i + 5) * TAU;
    const d = 8 + 12 * noise(seed, i + 15);
    parts.push({
      cx: 100 + Math.cos(a) * d,
      cy: 100 + Math.sin(a) * d,
      r: 14 + 8 * noise(seed, i + 25),
    });
  }

  const n = Math.max(5, arms);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + noise(seed, i) * 0.8;
    const len = 34 + 44 * noise(seed, i + 40);
    // Alternating whip direction: all bending the same way reads as a pinwheel
    const bend =
      (noise(seed, i + 45) < 0.5 ? -1 : 1) * (10 + 24 * noise(seed, i + 50));
    const width = 5.5 + 6 * noise(seed, i + 80);
    const bead = 2.5 + 6 * noise(seed, i + 160);
    parts.push(...tendril(a, len, bend, width, bead));
  }

  // Loose droplets, mostly small, always round
  for (let i = 0; i < 9; i++) {
    const a = noise(seed, i + 500) * TAU;
    const d = 52 + 40 * noise(seed, i + 600);
    parts.push({
      cx: 100 + Math.cos(a) * d,
      cy: 100 + Math.sin(a) * d,
      r: 1.5 + 7 * Math.pow(noise(seed, i + 700), 2),
    });
  }
  return parts;
}

/** A thick arc of liquid caught mid-pour, swelling in the middle. */
function ribbonSource(seed: number, arms: number): Part[] {
  const parts: Part[] = [];
  const tilt = noise(seed, 1) * TAU;
  const sweep = 2.1 + noise(seed, 2) * 1.4;
  const radius = 54 + 14 * noise(seed, 3);
  const steps = 34;
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const a = tilt + sweep * (t - 0.5);
    // Swell in the middle, taper to nothing at both ends
    const w = 3 + 12 * Math.sin(Math.PI * t) * (0.7 + 0.5 * noise(seed, s + 20));
    parts.push({
      cx: 100 + Math.cos(a) * radius,
      cy: 100 + Math.sin(a) * radius,
      r: w,
    });
  }
  // Droplets shed off the arc
  for (let i = 0; i < Math.max(4, arms); i++) {
    const a = tilt + sweep * (noise(seed, i + 90) - 0.5);
    const d = radius + 16 + 30 * noise(seed, i + 100);
    parts.push({
      cx: 100 + Math.cos(a) * d,
      cy: 100 + Math.sin(a) * d,
      r: 2 + 7 * Math.pow(noise(seed, i + 110), 2),
    });
  }
  return parts;
}

/** Flicked liquid — almost no body, thrown along one axis. */
function spraySource(seed: number, arms: number): Part[] {
  const dir = noise(seed, 3) * TAU;
  const count = Math.max(20, arms * 3);
  const parts: Part[] = [];
  for (let i = 0; i < count; i++) {
    const reach = noise(seed, i + 200);
    const spread = 2.2 * (1 - reach * 0.5);
    const a = dir + (noise(seed, i + 7) - 0.5) * spread;
    const d = 12 + 84 * reach;
    parts.push({
      cx: 100 + Math.cos(a) * d,
      cy: 100 + Math.sin(a) * d,
      r: 1.4 + 11 * Math.pow(noise(seed, i + 300), 2.4),
    });
  }
  return parts;
}

/** A mass with runs sagging off its lower edge, each ending in a fat bead. */
function dripSource(seed: number, arms: number): Part[] {
  const parts: Part[] = [];
  for (let i = 0; i < 7; i++) {
    parts.push({ cx: 52 + i * 16, cy: 84 + noise(seed, i) * 10, r: 22 });
  }
  const n = Math.max(3, Math.round(arms / 2));
  for (let i = 0; i < n; i++) {
    const x = 58 + (84 / Math.max(1, n - 1)) * i + noise(seed, i) * 10;
    const len = 26 + 58 * noise(seed, i + 30);
    const w = 3.5 + 5 * noise(seed, i + 60);
    for (let s = 0; s <= 15; s++) {
      const t = s / 15;
      parts.push({ cx: x, cy: 96 + len * t, r: w * (1 - t * 0.25) });
    }
    parts.push({ cx: x, cy: 96 + len + w * 0.7, r: w * 1.55 });
  }
  return parts;
}

const sources = {
  splash: splashSource,
  ribbon: ribbonSource,
  spray: spraySource,
  drip: dripSource,
};

// Barely there: enough to break the geometry, not enough to square off the
// roundness that makes it read as liquid.
const tune: Record<SplatVariant, { frequency: number; scale: number }> = {
  splash: { frequency: 0.035, scale: 9 },
  ribbon: { frequency: 0.04, scale: 7 },
  spray: { frequency: 0.05, scale: 6 },
  drip: { frequency: 0.03, scale: 7 },
};

export function Splatter({
  seed = 1,
  variant = "splash",
  color,
  opacity = 1,
  /** Arms for `splash`, droplet density for the rest. */
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
  const uid = `${variant}-${seed}`;
  const t = tune[variant];
  const parts = sources[variant](seed, arms);

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute ${className}`}
    >
      <defs>
        <filter
          id={`f-${uid}`}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={t.frequency}
            numOctaves={2}
            seed={seed}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={t.scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/*
          Depth — a flat fill is what read as dull however high the opacity.
          userSpaceOnUse is load-bearing: with the default objectBoundingBox
          every circle gets its own gradient, and the overlapping circles a
          tendril is made of stop merging and read as beads on a string.
        */}
        <linearGradient
          id={`g-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1="30"
          y1="0"
          x2="160"
          y2="200"
        >
          <stop offset="0%" stopColor={`color-mix(in srgb, #fff 38%, ${color})`} />
          <stop offset="52%" stopColor={color} />
          <stop offset="100%" stopColor={`color-mix(in srgb, #000 20%, ${color})`} />
        </linearGradient>
        <radialGradient
          id={`s-${uid}`}
          gradientUnits="userSpaceOnUse"
          cx="80"
          cy="78"
          r="72"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {/*
          The highlight is one shape clipped to the body, not a highlight per
          circle: it is semi-transparent, so drawing it per circle stacks at
          every overlap and rings show up all over the form.
        */}
        <clipPath id={`c-${uid}`}>
          {parts.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} />
          ))}
        </clipPath>
      </defs>

      <g opacity={opacity} filter={`url(#f-${uid})`}>
        <g fill={`url(#g-${uid})`}>
          {parts.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} />
          ))}
        </g>
        {/* Wet highlight, once, across the whole body */}
        <g clipPath={`url(#c-${uid})`}>
          <rect x="0" y="0" width="200" height="200" fill={`url(#s-${uid})`} />
        </g>
      </g>
    </svg>
  );
}
