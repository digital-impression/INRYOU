/**
 * Carbonation rising through a section.
 *
 * Tinted rings rather than white fills: on a cream ground white bubbles are
 * invisible, which is how the first set managed to be on the page and still
 * read as missing. Positions and timings are fixed so the server and the
 * browser render the same markup.
 */

type Bubble = {
  /** Percent from the left. */
  l: number;
  /** Diameter in pixels. */
  s: number;
  /** Peak opacity. */
  o: number;
  /** Seconds for one rise. */
  d: number;
  delay: number;
  /** Sideways drift in pixels over the rise. */
  x: number;
};

const field: Bubble[] = [
  { l: 4, s: 9, o: 0.4, d: 13, delay: 1.8, x: 12 },
  { l: 10, s: 5, o: 0.55, d: 10, delay: 6.1, x: -8 },
  { l: 16, s: 14, o: 0.32, d: 16, delay: 3.4, x: 18 },
  { l: 22, s: 7, o: 0.5, d: 11.5, delay: 0, x: -10 },
  { l: 27, s: 11, o: 0.38, d: 14, delay: 8.2, x: 14 },
  { l: 33, s: 5, o: 0.6, d: 9.5, delay: 4.6, x: 7 },
  { l: 38, s: 17, o: 0.28, d: 18, delay: 2.1, x: -16 },
  { l: 44, s: 8, o: 0.5, d: 10.5, delay: 7.3, x: 10 },
  { l: 49, s: 12, o: 0.36, d: 13.5, delay: 0.9, x: -12 },
  { l: 55, s: 6, o: 0.58, d: 9, delay: 5.5, x: 9 },
  { l: 60, s: 15, o: 0.3, d: 17, delay: 3, x: 16 },
  { l: 65, s: 9, o: 0.46, d: 12, delay: 9.4, x: -9 },
  { l: 70, s: 5, o: 0.6, d: 10, delay: 1.4, x: 6 },
  { l: 75, s: 13, o: 0.34, d: 15, delay: 6.8, x: -14 },
  { l: 81, s: 7, o: 0.5, d: 11, delay: 4, x: 11 },
  { l: 86, s: 10, o: 0.4, d: 13, delay: 8.9, x: -7 },
  { l: 92, s: 6, o: 0.55, d: 9.5, delay: 2.7, x: 13 },
  { l: 97, s: 12, o: 0.3, d: 16, delay: 5.9, x: -11 },
];

export function Bubbles({
  color,
  /** How many of the field to use — they are spread across the width in order. */
  count = 12,
  /** Scales every bubble, for sections that want them smaller. */
  scale = 1,
  className = "",
}: {
  color: string;
  count?: number;
  scale?: number;
  className?: string;
}) {
  // Take an even spread rather than the first N, so a low count still covers
  // the full width instead of bunching on the left.
  const step = field.length / Math.min(count, field.length);
  const picked = Array.from({ length: Math.min(count, field.length) }, (_, i) =>
    field[Math.floor(i * step)],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {picked.map((b, n) => (
        <span
          key={n}
          className="animate-bubble absolute bottom-[4%] rounded-full border"
          style={{
            left: `${b.l}%`,
            height: b.s * scale,
            width: b.s * scale,
            borderColor: color,
            backgroundColor: `${color}1f`,
            ["--b-o" as string]: b.o,
            ["--b-d" as string]: `${b.d}s`,
            ["--b-delay" as string]: `${b.delay}s`,
            ["--b-x" as string]: `${b.x}px`,
          }}
        />
      ))}
    </div>
  );
}
