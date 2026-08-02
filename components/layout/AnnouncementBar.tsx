const messages = [
  "Abonneer & bespaar 15%",
  "Gratis verzending vanaf €35",
];

export function AnnouncementBar() {
  const track = Array.from({ length: 6 }).flatMap(() => messages);

  return (
    // Light sand rather than brown — the header underneath now carries the
    // dark brand colour, and two stacked dark bars would read as one heavy slab.
    <div className="overflow-hidden bg-sand text-charcoal-soft">
      <div className="flex w-max animate-marquee-slow">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1}
          >
            {track.map((m, i) => (
              <li
                key={`${dup}-${i}`}
                className="flex items-center gap-7 whitespace-nowrap px-7 py-2 font-display text-[0.9rem] italic tracking-wide"
              >
                {m}
                <span className="not-italic text-orange-deep/60">◦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
