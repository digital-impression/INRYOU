import { asset } from "@/lib/asset";

/**
 * A real paint splash, tinted to the brand.
 *
 * The artwork comes from a Photoshop brush set; the tips were pulled out of the
 * .abr and written as white-on-transparent PNGs. They are applied as CSS masks
 * rather than placed as images, so one asset serves every colour on the site —
 * the fill is `currentColor`, which means a caller sets tone and weight with
 * the same text-colour and opacity classes as everything else.
 *
 * This replaces several rounds of generated vector liquid. None of it got past
 * looking like a lump: real spatter has fine spray, uneven blobs and the odd
 * run, and that is drawn, not derived.
 */

const COUNT = 8;

export function Splat({
  seed = 1,
  rotate = 0,
  flip = false,
  className = "",
}: {
  /** Picks which of the eight splashes to use. */
  seed?: number;
  rotate?: number;
  /** Mirrors the mark, so a repeated splash doesn't read as a repeat. */
  flip?: boolean;
  className?: string;
}) {
  const src = asset(`/images/splash/splash-${(Math.abs(seed) % COUNT) + 1}.png`);
  // Unquoted on purpose: React escapes the quotes to &quot; inside the style
  // attribute, which defeats any tooling that rewrites asset paths in the HTML.
  const mask = `url(${src}) center / contain no-repeat`;

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block ${className}`}
      style={{
        backgroundColor: "currentColor",
        WebkitMask: mask,
        mask,
        transform: `rotate(${rotate}deg)${flip ? " scaleX(-1)" : ""}`,
      }}
    />
  );
}
