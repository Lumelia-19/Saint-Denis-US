import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import TacticalPattern from '@/components/TacticalPattern';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';

const SOCIAL_IMAGES = [
  '/assets/bg-article.png',
  '/assets/inscriptions-bg.webp',
  '/assets/player_u10_13.png',
  '/assets/player_u6_u9.png',
];

export const metadata: Metadata = {
  title: 'Actualités',
  description:
    "Toute l’actualité d’United Football Saint-Denis (UFSD) : vie du club, formation, événements, bénévoles et moments forts du territoire dionysien.",
  alternates: { canonical: '/actualites' },
  openGraph: {
    title: 'Actualités & vie du club | UFSD',
    description:
      "Suivez l’actualité d’United Football Saint-Denis : vie du club, formation, événements et initiatives qui font vivre le club au quotidien.",
    url: '/actualites',
    type: 'website',
  },
};

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    .toUpperCase();
}

export default function ActualitesPage() {
  const articles = getAllArticles();

  return (
    <section
      className="relative isolate overflow-hidden bg-surface pt-20 lg:pt-16"
      aria-labelledby="actualites-title"
    >
      {/* ============== Background image (pleine page) ============== */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/assets/bg-article.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[100%_22%]"
        />
      </div>

      {/* Atmosphere bleue + fond du bas qui revient en scrim pour articles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,27,75,0.15)_0%,rgba(13,27,75,0.45)_38%,color-mix(in_srgb,var(--color-scrim)_85%,transparent)_72%,var(--color-scrim)_92%)]"
      />

      {/* Tache scrim derriere le texte (cote gauche) - plus large */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_1100px_640px_at_22%_28%,color-mix(in_srgb,var(--color-scrim)_98%,transparent)_0%,color-mix(in_srgb,var(--color-scrim)_85%,transparent)_30%,color-mix(in_srgb,var(--color-scrim)_45%,transparent)_55%,transparent_80%)]"
      />

      {/* Decorations tactiques sur la droite */}
      <TacticalPattern tone="onDark" className="opacity-65" />

      {/* ============== HERO : titre + intro (par-dessus l'image) ============== */}
      <div className="relative z-10 mx-auto max-w-[1500px] px-5 pt-12 sm:px-8 lg:px-10 lg:pt-20 min-[1400px]:px-16">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-flame mb-4">Vie du club</p>
            <h1 id="actualites-title" className="hero-title text-navy lg:text-[5.4rem]">
              Actualités
              <br />
              <span className="text-flame">&amp; vie du club</span>
            </h1>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-navy sm:text-lg">
              Retrouvez toute l’actualité d’United Football Saint-Denis : vie du club, formation,
              événements, actions des bénévoles et moments forts partagés avec les familles du
              territoire dionysien.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ============== Articles + sidebar ============== */}
      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-8 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10 lg:px-10 lg:pt-14 min-[1400px]:px-16">
        {/* Articles + CTA */}
        <div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.08}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link href="/inscriptions" className="btn-primary group">
                Rejoindre le club
                <Icon
                  name="arrow-right"
                  size={18}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <p className="text-sm font-semibold text-navy/72">
                Rejoignez UFSD et vivez l’actualité du club au plus près.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Sidebar : Instagram + Citation */}
        <aside className="flex flex-col gap-5">
          <Reveal delay={0.1}>
            <section className="rounded-[1.15rem] border border-cloud bg-panel p-5 shadow-[0_22px_60px_-34px_rgba(13,27,75,0.6)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Icon name="instagram" size={28} className="text-flame" />
                  <p className="font-extrabold text-navy">@sdus_football</p>
                </div>
                <a
                  href="https://www.instagram.com/sdus_football/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary group px-5 py-2.5 text-sm"
                >
                  S&apos;abonner
                  <Icon name="arrow-right" size={16} strokeWidth={2.4} />
                </a>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {SOCIAL_IMAGES.map((src, i) => (
                  <a
                    key={src}
                    href="https://www.instagram.com/sdus_football/"
                    target="_blank"
                    rel="noreferrer"
                    className="relative aspect-square overflow-hidden rounded-lg bg-royal"
                  >
                    <Image
                      src={src}
                      alt={`Aperçu Instagram UFSD ${i + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </a>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.18}>
            <figure className="relative overflow-hidden rounded-[1.15rem] border border-cloud bg-panel p-6 shadow-[0_22px_60px_-34px_rgba(13,27,75,0.6)]">
              <Icon name="quote" size={42} className="text-flame" />
              <blockquote className="display-sm relative z-10 mt-3 text-[1.4rem] italic leading-[1.05] text-navy">
                Ce club, c&apos;est plus qu&apos;un maillot. C&apos;est une famille, des valeurs, et une passion partagée.
              </blockquote>
              <figcaption className="relative z-10 mt-5 text-sm font-bold text-flame">- Samir, parent bénévole</figcaption>
              <div className="pointer-events-none absolute -bottom-10 -right-8 text-navy/[0.07]">
                <Icon name="shield" size={180} strokeWidth={1.2} />
              </div>
            </figure>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}