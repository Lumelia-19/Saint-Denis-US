/** Decorative animated football-tactics overlay (X/O marks, arrows, pitch arcs). */
export default function TacticalPattern({
  className = '',
  tone = 'onDark',
}: {
  className?: string;
  /** onDark = white strokes (for dark sections); onLight = ink strokes (for light sections) */
  tone?: 'onDark' | 'onLight';
}) {
  // Literal class strings so Tailwind's JIT can detect them.
  const s =
    tone === 'onLight'
      ? ['text-navy/15', 'text-navy/12', 'text-navy/12', 'text-navy/10']
      : ['text-white/15', 'text-white/12', 'text-white/12', 'text-white/[0.06]'];

  return (
    <div className={`absolute inset-0 hidden overflow-hidden pointer-events-none md:block ${className}`} aria-hidden>
      <svg
        className={`absolute top-[12%] left-[8%] w-11 h-11 ${s[0]} animate-float`}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <line x1="8" y1="8" x2="32" y2="32" />
        <line x1="32" y1="8" x2="8" y2="32" />
      </svg>
      <svg
        className="absolute top-[18%] right-[14%] w-10 h-10 text-flame/25 animate-float-slow"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <circle cx="20" cy="20" r="14" />
      </svg>
      <svg
        className={`absolute bottom-[20%] left-[20%] w-20 h-10 ${s[1]}`}
        viewBox="0 0 80 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 20 H58 M44 8 L62 20 L44 32" />
      </svg>
      <svg
        className={`absolute top-[46%] right-[9%] w-12 h-12 ${s[2]} animate-float`}
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <line x1="8" y1="8" x2="32" y2="32" />
        <line x1="32" y1="8" x2="8" y2="32" />
      </svg>
      <svg
        className="absolute bottom-[12%] right-[28%] w-9 h-9 text-flame/20 animate-float-slow"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <circle cx="20" cy="20" r="14" />
      </svg>
      <svg
        className="absolute top-[30%] left-[44%] w-24 h-12 text-flame/15"
        viewBox="0 0 90 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 5"
        strokeLinecap="round"
      >
        <path d="M6 28 Q45 2 84 28" />
      </svg>
      <svg
        className={`absolute -bottom-12 -left-12 w-56 h-56 ${s[3]}`}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="50" cy="50" r="48" />
        <circle cx="50" cy="50" r="22" />
        <line x1="50" y1="2" x2="50" y2="98" />
      </svg>
    </div>
  );
}
