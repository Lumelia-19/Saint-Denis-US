'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-mesh px-6 py-32">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-flame" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,101,34,0.2),transparent_62%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center text-flame">Une erreur est survenue</p>

        <h1 className="hero-title mt-6 text-white text-[5rem] leading-none sm:text-[6.5rem]">
          Hors<span className="text-flame">jeu</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
          Quelque chose s’est mal passé de notre côté. Réessayez ou revenez à
          l’accueil pour reprendre la rencontre.
        </p>

        {error.digest && (
          <p className="mt-4 text-xs text-white/40">
            Référence : <span className="nums">{error.digest}</span>
          </p>
        )}

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary group">
            <Icon name="whistle" size={18} strokeWidth={2.4} className="transition-transform duration-300 group-hover:rotate-12" />
            Réessayer
          </button>
          <Link href="/" className="btn-ghost group">
            <Icon name="arrow-right" size={18} strokeWidth={2.4} className="-scale-x-100 transition-transform duration-300 group-hover:-translate-x-1" />
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </section>
  );
}