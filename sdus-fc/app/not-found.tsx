import Link from 'next/link';
import Icon from '@/components/Icon';

export const metadata = {
  title: 'Page introuvable',
  description: 'La page que vous cherchez n’existe pas ou a été déplacée.',
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-mesh px-6 py-32">
      {/* Liseré flammé en haut */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-flame" />

      {/* Halo décoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,101,34,0.22),transparent_62%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center text-flame">Erreur 404</p>

        <h1 className="hero-title mt-6 text-white text-[8rem] leading-none sm:text-[10rem]">
          4<span className="text-flame">0</span>4
        </h1>

        <h2 className="display-sm mt-4 text-2xl text-white sm:text-3xl">
          Page introuvable
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
          La page que vous cherchez semble avoir été déplacée, supprimée ou
          n’a jamais existé. Revenez sur le terrain pour retrouver votre chemin.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary group">
            <Icon name="arrow-right" size={18} strokeWidth={2.4} className="-scale-x-100 transition-transform duration-300 group-hover:-translate-x-1" />
            Retour à l’accueil
          </Link>
          <Link href="/contact" className="btn-ghost group">
            Nous contacter
            <Icon name="arrow-right" size={18} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}