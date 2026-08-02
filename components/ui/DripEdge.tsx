import { Splatter } from "./Splatter";

/**
 * Paint running off the bottom edge of a section into the one below.
 *
 * Each drip's mass sits *above* the boundary in the section's own colour, so
 * it disappears into it; only the runs hang out into the next section. The
 * section must not clip its overflow for this to show — clip the background
 * layer instead.
 */
export function DripEdge({
  color,
  count = 5,
  seed = 100,
  className = "",
}: {
  color: string;
  count?: number;
  seed?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-around ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        // Stagger how far each cluster has run, or the edge reads as a border
        const drop = [0.38, 0.52, 0.3, 0.58, 0.44, 0.34, 0.5][i % 7];
        const scale = [1, 0.82, 1.12, 0.9, 1.05, 0.86, 1.08][i % 7];
        return (
        <div
          key={i}
          className="relative h-[110px] w-[150px] shrink-0 sm:h-[150px] sm:w-[200px]"
          style={{ transform: `translateY(${drop * 100}%) scaleX(${scale})` }}
        >
          <Splatter
            seed={seed + i * 13}
            variant="drip"
            color={color}
            arms={7}
            className="inset-0 h-full w-full"
          />
        </div>
        );
      })}
    </div>
  );
}
