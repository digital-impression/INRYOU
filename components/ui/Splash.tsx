/**
 * Abstract splash marks — outline only.
 *
 * Earlier attempts filled these shapes and that is what made them read as
 * clumps of slime: a solid organic mass at any size is a blob, and pushing the
 * opacity up only made the blob louder. As a hairline contour the same shape
 * reads as a mark rather than a substance, and it stays quiet enough to sit
 * behind content.
 *
 * Colour comes from `currentColor`, so a caller sets tone and weight with
 * ordinary text-colour and opacity classes. Deterministic per seed, so no
 * shape shifts between server and browser.
 *
 *   splash    — an irregular contour with droplets thrown off it
 *   ripple    — broken concentric rings under a falling drop
 *   flick     — droplets along the arc of a thrown flick
 *   droplets  — a loose cluster, for carbonation
 */

export type SplashVariant = "splash" | "ripple" | "flick" | "droplets";

const TAU = Math.PI * 2;

function noise(seed: number, i: number) {
  let h = (Math.imul(seed, 374761393) + Math.imul(i, 668265263)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

type Pt = { x: number; y: number };
const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/** Closed organic contour, smoothed by curving between the midpoints. */
function contour(pts: Pt[]) {
  const n = pts.length;
  const start = mid(pts[0], pts[1]);
  let d = `M${start.x.toFixed(1)},${start.y.toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const c = pts[i % n];
    const e = mid(pts[i % n], pts[(i + 1) % n]);
    d += `Q${c.x.toFixed(1)},${c.y.toFixed(1)} ${e.x.toFixed(1)},${e.y.toFixed(1)}`;
  }
  return `${d}Z`;
}

const polar = (a: number, r: number): Pt => ({
  x: 50 + Math.cos(a) * r,
  y: 50 + Math.sin(a) * r,
});

function Splash({ seed }: { seed: number }) {
  const lobes = 16;
  const pts = Array.from({ length: lobes }, (_, i) => {
    const a = (i / lobes) * TAU + noise(seed, i) * 0.18;
    // Alternating long and short: a contour with an even radius closes into a
    // pebble, and the midpoint smoothing rounds anything subtler than this away
    const long = i % 2 === 0;
    const reach = long ? 1.15 + noise(seed, i + 20) * 0.5 : 0.42 + noise(seed, i + 40) * 0.18;
    return polar(a, 25 * reach);
  });
  const drops = Array.from({ length: 5 }, (_, i) => {
    const a = noise(seed, i + 60) * TAU;
    const d = 38 + 12 * noise(seed, i + 80);
    return { ...polar(a, d), r: 1.6 + 3.4 * noise(seed, i + 100) };
  });
  return (
    <>
      <path d={contour(pts)} />
      {drops.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} />
      ))}
    </>
  );
}

function Ripple({ seed }: { seed: number }) {
  const arc = (r: number, from: number, to: number) => {
    const a = polar(from, r);
    const b = polar(to, r);
    const large = to - from > Math.PI ? 1 : 0;
    return `M${a.x.toFixed(1)},${a.y.toFixed(1)} A${r} ${r} 0 ${large} 1 ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
  };
  const rings = [16, 26, 36, 45].map((r, i) => {
    const gap = 0.5 + noise(seed, i) * 0.9;
    const from = noise(seed, i + 10) * TAU;
    return arc(r, from + gap, from + TAU - gap);
  });
  return (
    <>
      {rings.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <circle cx="50" cy="50" r="4.5" />
    </>
  );
}

function Flick({ seed }: { seed: number }) {
  const tilt = noise(seed, 1) * TAU;
  const sweep = 1.5 + noise(seed, 2) * 0.9;
  const dots = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    const a = tilt + sweep * (t - 0.5);
    const r = 20 + 26 * t;
    return { ...polar(a, r), rad: 5.5 * (1 - t * 0.82) + 0.8 * noise(seed, i + 30) };
  });
  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.rad} />
      ))}
    </>
  );
}

function Droplets({ seed }: { seed: number }) {
  const dots = Array.from({ length: 7 }, (_, i) => {
    const a = (i * 2.399963 + seed) % TAU;
    const d = 10 + 32 * noise(seed, i + 5);
    return { ...polar(a, d), rad: 2.5 + 8 * Math.pow(noise(seed, i + 25), 1.6) };
  });
  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.rad} />
      ))}
    </>
  );
}

const variants = {
  splash: Splash,
  ripple: Ripple,
  flick: Flick,
  droplets: Droplets,
};

export function Splat({
  variant = "splash",
  seed = 1,
  rotate = 0,
  className = "",
}: {
  variant?: SplashVariant;
  seed?: number;
  rotate?: number;
  className?: string;
}) {
  const Shape = variants[variant];
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Shape seed={seed} />
    </svg>
  );
}
