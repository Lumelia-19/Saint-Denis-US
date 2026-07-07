export default function Loading() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6">
      <div className="absolute inset-0 bg-grid-ink opacity-60" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <span className="relative grid h-14 w-14 place-items-center">
          {/* Anneau extérieur en rotation (flame) */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-[3px] border-cloud border-t-flame animate-spin"
            style={{ animationDuration: '0.9s' }}
          />
          {/* Pastille centrale (accent) */}
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </span>

        <p className="eyebrow text-accent">
          <span className="tracking-[0.28em]">Chargement…</span>
        </p>
      </div>
    </section>
  );
}