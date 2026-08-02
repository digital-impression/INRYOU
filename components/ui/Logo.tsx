import Link from "next/link";

export function Logo({
  className = "",
  showTagline = false,
  tone = "dark",
}: {
  className?: string;
  showTagline?: boolean;
  /** `dark` = charcoal wordmark on a light surface, `light` = cream on brown. */
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="INRYOU — home"
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span
        className={`font-sans text-[1.45rem] font-semibold tracking-[0.06em] ${
          tone === "light" ? "text-cream" : "text-charcoal"
        }`}
      >
        INRYOU
      </span>
      {showTagline && (
        <span
          className={`mt-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] ${
            tone === "light" ? "text-cream/55" : "text-muted"
          }`}
        >
          natural balance
        </span>
      )}
    </Link>
  );
}
